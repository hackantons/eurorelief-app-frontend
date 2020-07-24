import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
import { settingsDB } from '@app/store/idb';

const initialState: State = {
  intlLocale: defaultLocale,
  intlMessages: locales[defaultLocale][1],
  auth: false,
};

export const actions = (store: Store<State>) => ({
  setAuth: ({ auth }, newAuth) => store.setState({ auth: newAuth }),
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
