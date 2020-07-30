import React from 'react';
import { Route } from 'react-router-dom';
import { useIntl } from 'react-intl';

import Page from '@comp/Portal/Page';
import Settings from './Settings/Settings';

import './Portal.css';

const Portal = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} portal`}>
      <Route path="/:page/">
        <Page />
      </Route>
      <Route path="/" exact>
        <h1>{formatMessage({ id: 'portal.title' })}</h1>
        <Settings />
      </Route>
    </div>
  );
};

export default Portal;
