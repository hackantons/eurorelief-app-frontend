import React from 'react';
import { useIntl } from 'react-intl';

import NotificationsInfo from '@comp/Portal/Notifications/Info';

import './Page.css';

const NotificationsPage = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={`${className} notifications-page`}>
      <h1>{formatMessage({ id: 'navigation.notifications' })}</h1>
      <NotificationsInfo className="notifications-page__info" />
    </div>
  );
};

export default NotificationsPage;
