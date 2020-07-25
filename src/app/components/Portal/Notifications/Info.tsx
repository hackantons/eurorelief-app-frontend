import React from 'react';
import { useIntl } from 'react-intl';

import { Button, Message } from '@app/theme';

import './Info.css';

const NotificationsInfo = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();

  return (
    <Message className={`${className} notifications-info`}>
      <p>{formatMessage({ id: 'push.about' })}</p>
      <Button
        className="notifications-info__button"
        onClick={() => alert('Noch nicht implementiert')}
        ui="none"
      >
        {formatMessage({ id: 'push.register' })}
      </Button>
    </Message>
  );
};

export default NotificationsInfo;
