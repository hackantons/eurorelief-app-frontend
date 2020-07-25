import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
import { settingsDB } from '@app/store/idb';
import { getNotifications } from '@app/vendor/api';

const initialState: State = {
  intlLocale: defaultLocale,
  intlMessages: locales[defaultLocale][1],
  auth: false,
  notifications: [],
};

export const actions = (store: Store<State>) => ({
  setLocale: (state, intl) => {
    if (!(intl in locales)) {
      intl = locales[0];
    }
    store.setState({
      intlLocale: intl,
      intlMessages: locales[intl][1],
    });
  },
  setAuth: ({ auth }, newAuth) => store.setState({ auth: newAuth }),
  updateNotifications: () =>
    getNotifications().then(notifications => {
      console.log('notifications', notifications);
      // @ts-ignore
      store.setState({ notifications });
    }),
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
