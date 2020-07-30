import React from 'react';
import { useIntl } from 'react-intl';
import { State } from '@app/store/types';
import { useStoreState } from 'unistore-hooks';

import './Messages.css';

const Messages = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { notifications }: State = useStoreState(['notifications']);

  return (
    <div className={`${className} messages`}>
      <h2>{formatMessage({ id: 'messages.title' })}</h2>
      <ul className="messages__list">
        {notifications.map(message => (
          <li className="messages__item">
            <p className="messages__item-date">
              {formatMessage(
                { id: 'messages.item.date' },
                { date: message.date }
              )}
            </p>
            <p className="nmessages__item-text">{message.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
