import React from 'react';
import { useIntl } from 'react-intl';

import Settings from './Settings/Settings';
import Messages from './Messages/Messages';

import './Portal.css';

const Portal = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} portal`}>
      <h1>{formatMessage({ id: 'portal.title' })}</h1>
      <Settings className="portal__settings" />
      <Messages className="portal__messages" />
    </div>
  );
};

export default Portal;
