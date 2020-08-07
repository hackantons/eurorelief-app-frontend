import React from 'react';
import { useIntl } from 'react-intl';

import Settings from './Settings/Settings';
import Notifications from './Notifications/Notifications';

import './Portal.css';

// todo: check for push-subscription

const Portal = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} portal`}>
      <h1>{formatMessage({ id: 'portal.title' })}</h1>
      <Settings className="portal__settings" />
      <Notifications className="portal__notifications" />
    </div>
  );
};

export default Portal;
