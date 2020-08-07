import React from 'react';
import { useIntl } from 'react-intl';

import dayjs from '@app/vendor/dayjs';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { FETCH_STATES } from '@app/vendor/constants';
import { actions } from '@app/store';
import { Loader, Message, Badge, Icon } from '@app/theme';
import { Notification as NotificationType } from './types';
import Notification from './Notification';

import './Notifications.css';

const Messages = ({ className = '' }: { className?: string }) => {
  const [notificationsSent, setNotificationsSent] = React.useState<
    Array<string>
  >([]);
  const [oldOpen, setOldOpen] = React.useState(false);
  const { formatMessage } = useIntl();
  const { notifications }: State = useStoreState(['notifications']);
  const { updateNotifications, setNotificationsAsSeen } = useActions(actions);

  React.useEffect(() => {
    updateNotifications();
    // todo: reload notifications on push rcieved
  }, []);

  const notificationsSeen: Array<NotificationType> = React.useMemo(
    () => notifications.data.filter(notification => notification.seen),
    [notifications]
  );

  const notificationsUnseen: Array<NotificationType> = React.useMemo(
    () => notifications.data.filter(notification => !notification.seen),
    [notifications]
  );

  React.useEffect(() => {
    const toSend = notificationsUnseen
      .filter(item => notificationsSent.indexOf(item.uuid) <= 0)
      .map(item => item.uuid);

    if (toSend.length !== 0) {
      setNotificationsAsSeen(toSend);
      setNotificationsSent([...toSend, ...notificationsSent]);
    }
  }, [notificationsUnseen]);

  return (
    <div className={`${className} notifications`}>
      <h2 className="notifications__title">
        {formatMessage({ id: 'notifications.title' })}{' '}
        {notificationsUnseen.length !== 0 && (
          <Badge
            count={notificationsUnseen.length}
            className="notifications__badge"
          />
        )}
      </h2>
      {notifications.state === FETCH_STATES.PENDING && <Loader />}
      {notifications.state === FETCH_STATES.SUCCESS &&
        (notificationsUnseen.length !== 0 ? (
          <ul className="notifications__list">
            {notificationsUnseen.map(notification => (
              <li className="notifications__item">
                <Notification notification={notification} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="notifications__notification text--color-light">
            {formatMessage({ id: 'notifications.empty' })}
          </p>
        ))}
      {notifications.state === FETCH_STATES.SUCCESS &&
        notificationsSeen.length !== 0 && (
          <div className="notifications-seen">
            <h3
              className="notifications-seen__title"
              onClick={() => setOldOpen(!oldOpen)}
            >
              {formatMessage({ id: 'notifications.title.old' })}
              <Icon icon="mdi/chevron-down" rotate={oldOpen ? 180 : false} />
            </h3>
            {oldOpen && (
              <ul className="notifications-seen__list">
                {notificationsSeen.map(notification => (
                  <li className="notifications-seen__item">
                    <Notification notification={notification} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      {notifications.state === FETCH_STATES.ERROR && (
        <Message type="error" className="notifications__message">
          {formatMessage({ id: notifications.error })}
        </Message>
      )}
    </div>
  );
};

export default Messages;
