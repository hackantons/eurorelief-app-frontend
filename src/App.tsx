import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider, useStoreState, useActions } from 'unistore-hooks';
import { HashRouter } from 'react-router-dom';

import { Loader } from '@app/theme';

import { settingsDB } from '@app/store/idb';

import './App.css';

import { store, actions } from '@app/store';
import { State } from '@app/store/types';
import { validateToken } from '@app/vendor/api';
import LogIn from '@comp/login/LogIn';
import Portal from '@comp/portal/Portal';

const App = () => {
  const [init, setInit] = useState<boolean>(false);

  const { intlLocale, intlMessages, auth }: State = useStoreState([
    'intlLocale',
    'intlMessages',
    'auth',
  ]);
  const { setAuth } = useActions(actions);

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

  return (
    <IntlProvider locale={intlLocale} messages={intlMessages}>
      <div className="app">
        {init ? (
          <React.Fragment>
            {auth ? (
              <Portal className="app__portal" />
            ) : (
              <LogIn className="app__login" setAuth={setAuth} />
            )}
            <div className="app__footer">FOOTER</div>
          </React.Fragment>
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
