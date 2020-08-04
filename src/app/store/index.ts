import { defaultLocale, fetchMessages, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { Identity, State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
//import { settingsDB } from '@app/store/idb';
import { getMessages } from '@app/vendor/api';
import { FETCH_STATES } from '@app/vendor/constants';
import dayjs from '@app/vendor/dayjs';

const initialState: State = {
  intl: {
    locale: defaultLocale,
    messages: locales[defaultLocale][1],
    loading: '',
  },
  identity: null,
  notifications: {
    state: FETCH_STATES.PENDING,
    data: [],
    error: '',
  },
};

export const actions = (store: Store<State>) => ({
  setLocale: (state, intl) => {
    if (!(intl in locales)) {
      intl = Object.keys(locales)[0];
    }
    store.setState({
      intl: {
        ...state.intl,
        loading: intl,
      },
    });

    fetchMessages(intl).then(messages => {
      document.getElementsByTagName('html')[0].dir = locales[intl][3]
        ? 'rtl'
        : 'ltr';

      require(`dayjs/locale/${intl}`);
      dayjs.locale(intl);
      // todo: set "lang" cookie

      store.setState({
        intl: {
          ...state.intl,
          locale: intl,
          messages,
          loading: '',
        },
      });
    });
  },
  setIdentity: (state, identity: Identity) => store.setState({ identity }),
  updateNotifications: state => {
    store.setState({
      notifications: {
        ...state.notifications,
        state: FETCH_STATES.PENDING,
      },
    });
    getMessages()
      .then(res =>
        store.setState({
          notifications: {
            ...state.notifications,
            state: FETCH_STATES.SUCCESS,
            data: res.data,
          },
        })
      )
      .catch(() =>
        store.setState({
          notifications: {
            ...state.notifications,
            state: FETCH_STATES.ERROR,
            error: 'general.error',
          },
        })
      );
  },
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
