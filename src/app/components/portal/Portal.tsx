import React from 'react';
import { Route } from 'react-router-dom';

import Page from '@comp/Portal/Page';
import Settings from './Settings/Settings';

import './Portal.css';

const Portal = ({ className = '' }: { className?: string }) => (
  <div className={`${className} portal`}>
    <div className="portal__content">
      <Route path="/:page/">
        <Page />
      </Route>
      <Route path="/" exact>
        <h1>Hello</h1>
        <Settings />
      </Route>
    </div>
  </div>
);

export default Portal;
