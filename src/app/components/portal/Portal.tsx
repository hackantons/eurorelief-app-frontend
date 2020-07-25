import React from 'react';
import Navigation from '@comp/portal/Navigation';
import Page from '@comp/portal/Page';
import { Route } from 'react-router-dom';

import './Portal.css';
import { Message } from '@app/theme';

const Portal = ({ className = '' }: { className?: string }) => (
  <div className={`${className} portal`}>
    <Navigation className="portal__header" />
    <div className="portal__content">
      <Route path="/:page/">
        <Page />
      </Route>
      <Route path="/" exact>
        <h1>Home</h1>
        <Message>Welcome back!</Message>
      </Route>
    </div>
  </div>
);

export default Portal;
