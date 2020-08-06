import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, useIntl } from 'react-intl';
import { Provider, useStoreState, useActions } from 'unistore-hooks';

import { Loader } from '@app/theme';
import { store, actions } from '@app/store';
import { State } from '@app/store/types';
import Onboarding from '@comp/Onboarding/Onboarding';
import Portal from '@comp/Portal/Portal';
import { Logo } from '@app/theme';
import { doSignIn } from '@app/authentication/actions';
import { fetchUser } from '@app/authentication/network';
import { getCookie, setCookie } from '@app/vendor/cookie';
import { COOKIE_LANG } from '@app/vendor/constants';
import { locales } from '@app/intl';

import './App.css';
import Logout from '@comp/Logout';

const App = () => {
  const [appInit, setAppInit] = React.useState<boolean>(false);

  const { intl, identity }: State = useStoreState(['intl', 'identity']);
  const { setIdentity, setLocale } = useActions(actions);

  React.useEffect(() => {
    doSignIn()
      .then(() =>
        fetchUser()
          .then(identity => {
            setIdentity(identity);
            setAppInit(true);
          })
          .catch(() => setAppInit(true))
      )
      .catch(() => setAppInit(true));
  }, []);

  React.useEffect(() => {
    const lang =
      getCookie(COOKIE_LANG) || window.navigator.language.split('-')[0];
    if (Object.keys(locales).indexOf(lang) !== -1 && lang !== intl.locale) {
      setLocale(lang);
    }
  });

  return (
    <IntlProvider locale={intl.locale} messages={intl.messages}>
      <div className="app" lang={intl.locale}>
        <div className="app__header">
          <Logo className="app__logo" />
          {identity && <Logout className="app__logout" />}
        </div>
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
