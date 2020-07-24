import React from 'react';
import Navigation from '@comp/portal/Navigation';
import Page from '@comp/portal/Page';
import { Route } from 'react-router-dom';

import './Portal.css';

const Portal = ({ className = '' }: { className?: string }) => (
  <div className={`${className} portal`}>
    <Navigation className="portal__header" />
    <div className="portal__content">
      <Route path="/:page/">
        <Page />
      </Route>
      <Route path="/" exact>
        <h1>Home</h1>
      </Route>
    </div>
  </div>
);

export default Portal;
