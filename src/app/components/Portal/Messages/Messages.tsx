import React from 'react';
import { useIntl } from 'react-intl';

import dayjs from '@app/vendor/dayjs';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { FETCH_STATES } from '@app/vendor/constants';
import { actions } from '@app/store';
import { Loader, Message } from '@app/theme';
import { postMessagesSeen } from '@app/vendor/api';

import './Messages.css';

const Messages = ({ className = '' }: { className?: string }) => {
  const [messagesSeen, setMessagesSeen] = React.useState<Array<string>>([]);
  const { formatMessage } = useIntl();
  const { messages }: State = useStoreState(['messages']);
  const { updateMessages, setMessagesAsSeen } = useActions(actions);

  React.useEffect(() => {
    updateMessages();
    // todo: reload messages on push rcieved
  }, []);

  React.useEffect(() => {
    const messagesUnseen = messages.data
      .filter(message => !message.seen)
      .map(message => message.uuid);
    const toSend = messagesUnseen.filter(
      item => messagesSeen.indexOf(item) < 0
    );

    if (toSend.length !== 0) {
      setMessagesAsSeen(toSend);
      setMessagesSeen([...toSend, ...messagesSeen]);
    }
  }, [messages]);

  return (
    <div className={`${className} messages`}>
      <h2>{formatMessage({ id: 'messages.title' })}</h2>
      {messages.state === FETCH_STATES.PENDING && <Loader />}
      {messages.state === FETCH_STATES.SUCCESS &&
        (messages.data.length !== 0 ? (
          <ul className="messages__list">
            {messages.data.map(message => (
              <li
                className={`messages__item ${
                  message.seen ? '' : 'messages__item--new'
                }`}
              >
                <p className="messages__item-date">
                  {formatMessage(
                    { id: 'messages.item.date' },
                    { date: dayjs(message.sent).format('LLL') }
                  )}
                </p>
                <p className="messages__item-text">{message.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Message type="message" className="messages__notification">
            {formatMessage({ id: 'messages.empty' })}
          </Message>
        ))}
      {messages.state === FETCH_STATES.ERROR && (
        <Message type="error" className="messages__notification">
          {formatMessage({ id: messages.error })}
        </Message>
      )}
    </div>
  );
};

export default Messages;
