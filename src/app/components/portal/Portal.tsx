import React from 'react';
import Navigation from '@comp/Portal/Navigation';
import Page from '@comp/Portal/Page';
import { Route } from 'react-router-dom';

import './Portal.css';
import { Message } from '@app/theme';
import PushNotifications from '@comp/Portal/PushNotifications';

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
    <PushNotifications className="portal__push-button" />
  </div>
);

export default Portal;
