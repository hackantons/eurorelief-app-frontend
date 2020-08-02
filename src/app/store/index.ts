import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { Identity, State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
//import { settingsDB } from '@app/store/idb';
import { fetchLanguageStrings, getNotifications } from '@app/vendor/api';

const initialState: State = {
  intl: {
    locale: defaultLocale,
    messages: locales[defaultLocale][1],
    loading: '',
  },
  identity: null,
  notifications: [],
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
    fetchLanguageStrings(intl).then(messages => {
      document.getElementsByTagName('html')[0].dir = locales[intl][3]
        ? 'rtl'
        : 'ltr';

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
  updateNotifications: () =>
    getNotifications().then(notifications => {
      // @ts-ignore
      store.setState({ notifications });
    }),
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
