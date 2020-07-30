import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider, useStoreState, useActions } from 'unistore-hooks';

import { Loader } from '@app/theme';
import { settingsDB } from '@app/store/idb';
import { store, actions } from '@app/store';
import { State } from '@app/store/types';
import { validateToken } from '@app/vendor/api';
import Onboarding from '@comp/Onboarding/Onboarding';
import Portal from '@comp/Portal/Portal';
import { Logo } from '@app/theme';

import './App.css';

const App = () => {
  const [appInit, setAppInit] = useState<boolean>(false);

  const { intlLocale, intlMessages, identity }: State = useStoreState([
    'intlLocale',
    'intlMessages',
    'identity',
  ]);
  const { setIdentity, updateNotifications } = useActions(actions);

  useEffect(() => {
    settingsDB
      .get('jwt')
      .then((jwt: string) =>
        validateToken(jwt)
          .then(identity => {
            setIdentity(identity);
            setAppInit(true);
          })
          .catch(() => setAppInit(true))
      )
      .catch(() => setAppInit(true));
  }, []);

  useEffect(() => {
    updateNotifications();
  }, []);

  return (
    <IntlProvider locale={intlLocale} messages={intlMessages}>
      <div  {...(intlLocale === "ar" ? {dir:"rtl"} : {})} className={'app ' + intlLocale}>
        <Logo className="app__logo" />
        {appInit ? (
          identity ? (
            <Portal className="app__content app__content--portal" />
          ) : (
            <Onboarding className="app__content app__content--onboarding" />
          )
        ) : (
          <Loader className="app__loader" />
        )}
      </div>
    </IntlProvider>
  );
};

ReactDOM.render(
  <Provider value={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
