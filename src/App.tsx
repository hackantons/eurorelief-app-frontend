import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider, useStoreState, useActions } from 'unistore-hooks';
import { HashRouter } from 'react-router-dom';

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
  const [init, setInit] = useState<boolean>(false);

  const { intlLocale, intlMessages, auth }: State = useStoreState([
    'intlLocale',
    'intlMessages',
    'auth',
  ]);
  const { setAuth, updateNotifications } = useActions(actions);

  useEffect(() => {
    settingsDB
      .get('jwt')
      .then((jwt: string) =>
        validateToken(jwt)
          .then(auth => {
            setAuth(auth);
            setInit(true);
          })
          .catch(() => setInit(true))
      )
      .catch(() => setInit(true));
  }, []);

  useEffect(() => {
    updateNotifications();
  }, []);

  return (
    <IntlProvider locale={intlLocale} messages={intlMessages}>
      <div className="app">
        <Logo className="app__logo" />
        {init ? (
          auth ? (
            <React.Fragment>
              <Portal className="app__content app__content--portal" />
            </React.Fragment>
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
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.querySelector('#app')
);
