import React from 'react';
import { useIntl } from 'react-intl';

import { State } from '@app/store/types';
import { Notification } from './types';
import { useStoreState } from 'unistore-hooks';

import './List.css';

import NotificationsListItem from '@comp/Portal/Notifications/ListItem';

const NotificationsList = ({ className = '' }: { className?: string }) => {
  const { notifications }: State = useStoreState(['notifications']);

  return (
    <div className={`${className} notification-list`}>
      {notifications.map((notification: Notification) => (
        <NotificationsListItem
          className="notification-list__item"
          notification={notification}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
