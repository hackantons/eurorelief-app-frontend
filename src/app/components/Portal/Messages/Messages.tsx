import React from 'react';
import { useIntl } from 'react-intl';

import dayjs from '@app/vendor/dayjs';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { FETCH_STATES } from '@app/vendor/constants';
import { actions } from '@app/store';
import { Loader, Message } from '@app/theme';

import './Messages.css';

const Messages = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { notifications }: State = useStoreState(['notifications']);
  const { updateNotifications } = useActions(actions);

  React.useEffect(() => {
    updateNotifications();
  }, []);

  // todo: update messages seen if messages change
  // todo: reload messages on push rcieved

  return (
    <div className={`${className} messages`}>
      <h2>{formatMessage({ id: 'messages.title' })}</h2>
      {notifications.state === FETCH_STATES.PENDING && <Loader />}
      {notifications.state === FETCH_STATES.SUCCESS &&
        (notifications.data.length !== 0 ? (
          <ul className="messages__list">
            {notifications.data.map(message => (
              <li className="messages__item">
                <p className="messages__item-date">
                  {formatMessage(
                    { id: 'messages.item.date' },
                    { date: dayjs(message.sent).format('LLL') }
                  )}
                </p>
                <p className="nmessages__item-text">{message.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Message type="message" className="messages__notification">
            {formatMessage({ id: 'messages.empty' })}
          </Message>
        ))}
      {notifications.state === FETCH_STATES.ERROR && (
        <Message type="error" className="messages__notification">
          {formatMessage({ id: notifications.error })}
        </Message>
      )}
    </div>
  );
};

export default Messages;
