import React from 'react';
import { useIntl } from 'react-intl';

import Settings from './Settings/Settings';
import Notifications from './Notifications/Notifications';
import PushBanner from './PushBanner/PushBanner';

import './Portal.css';

// todo: check for push-subscription

const Portal = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} portal`}>
      <h1>{formatMessage({ id: 'portal.title' })}</h1>
      <Settings className="portal__settings" />
      <Notifications className="portal__notifications" />
      <PushBanner />
    </div>
  );
};

export default Portal;
