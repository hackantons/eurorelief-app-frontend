import React from 'react';
import { useIntl } from 'react-intl';

import { Notification as NotificationType } from './types';
import dayjs from '@app/vendor/dayjs';

import './Notification.css';
import { Icon } from '@app/theme';

const Notification = ({
  className = '',
  notification,
}: {
  className?: string;
  notification: NotificationType;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} notification`}>
      {!notification.seen && (
        <Icon icon="mdi/envelope" className="notification__icon" />
      )}
      <div className="notification__content">
        <p className="notification__title">{notification.title}</p>
        <p className="notification__text">{notification.message}</p>
        <p className="notification__date">
          {formatMessage(
            { id: 'notifications.item.date' },
            { date: dayjs(notification.sent).format('LLL') }
          )}
        </p>
      </div>
    </div>
  );
};

export default Notification;
