import { defaultLocale, fetchMessages, locales } from '../intl';
import { isDev } from '../utils/helpers';
import { Identity, State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
//import { settingsDB } from '@app/store/idb';
import { getMessages, postMessagesSeen } from '@app/utils/api';
import { COOKIE_LANG, FETCH_STATES } from '@app/utils/constants';
import dayjs from '@app/utils/dayjs';
import { setCookie } from '@app/utils/cookie';
import { notificationsDB, settingsDB } from '@app/store/idb';

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
  offline: false,
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

      require(`dayjs/locale/${intl === 'so' ? 'en' : intl}`);
      dayjs.locale(intl);
      setCookie(COOKIE_LANG, intl);

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
  setIdentity: (state, identity: Identity) => {
    settingsDB.set('identity', identity);
    store.setState({ identity });
  },
  updateNotifications: state => {
    store.setState({
      notifications: {
        ...state.notifications,
        state: FETCH_STATES.PENDING,
      },
    });
    notificationsDB.getAll().then(dbNotifications => {
      if (dbNotifications) {
        store.setState({
          notifications: {
            ...state.notifications,
            state: FETCH_STATES.SUCCESS,
            data: dbNotifications,
          },
        });
      }
      getMessages()
        .then(res => {
          const notifications = res;

          // delete outdated notifications
          dbNotifications
            .filter(
              dbNotification =>
                !(dbNotification.uuid in notifications.map(n => n.uuid))
            )
            .map(toDelete => notificationsDB.delete(toDelete.uuid));

          // save notifications to indexedDB
          notifications.map(notification => notificationsDB.set(notification));

          // set new state
          store.setState({
            notifications: {
              ...state.notifications,
              state: FETCH_STATES.SUCCESS,
              data: notifications,
            },
          });
        })
        .catch(
          () =>
            navigator.onLine &&
            store.setState({
              notifications: {
                ...state.notifications,
                state: FETCH_STATES.ERROR,
                error: 'form.error.general',
              },
            })
        );
    });
  },
  setNotificationsAsSeen: (state, uuids) => {
    postMessagesSeen(uuids);
  },
  //setOffline: (state, offline: boolean) => store.setState({ offline: true }),
  setOffline: (state, offline: boolean) => store.setState({ offline }),
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
