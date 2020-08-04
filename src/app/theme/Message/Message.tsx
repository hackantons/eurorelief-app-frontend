import React from 'react';

import { Icon } from '@app/theme';

import './Message.css';

const Message = ({
  className = '',
  icon = true,
  type = 'message',
  children,
}: {
  className?: string;
  icon?: boolean;
  type?: 'message' | 'success' | 'error';
  children: any;
}) => (
  <div className={`${className} message message--${type}`}>
    {icon && (
      <Icon
        icon={type === 'error' ? 'mdi/alert' : 'mdi/information'}
        className="message__icon"
      />
    )}
    <div className="message__content">
      <p>{children}</p>
    </div>
  </div>
);

export default Message;
