import React from 'react';
import { useIntl } from 'react-intl';

import { Notification } from './types';

import './ListItem.css';

const NotificationsListItem = ({
  className = '',
  notification,
}: {
  className?: string;
  notification: Notification;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} notification-list-item`}>
      <p className="notification-list-item__date">
        {formatMessage(
          { id: 'notification.date' },
          { date: notification.date }
        )}
      </p>
      <p className="notification-list-item__text">{notification.text}</p>
    </div>
  );
};

export default NotificationsListItem;
