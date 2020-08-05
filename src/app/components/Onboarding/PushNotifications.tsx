import React from 'react';

import { Button, Message } from '@app/theme';
import { useIntl } from 'react-intl';
import { getPushKey, putSubscription } from '@app/vendor/api';

import './PushNotifications.css';

const PushNotifications = ({
  className = '',
  nextStep,
  swRegistration,
  applicationServerKey,
  error,
}: {
  className?: string;
  nextStep: Function;
  swRegistration: any;
  applicationServerKey: any;
  error: string;
}) => {
  const { formatMessage } = useIntl();

  React.useEffect(() => {
    if (
      !('serviceWorker' in navigator) ||
      !swRegistration ||
      !applicationServerKey
    ) {
      nextStep();
    }
  }, []);

  return (
    <div className={`${className} push-notifications`}>
      <p>{formatMessage({ id: 'onboarding.push.desc' })}</p>
      {error !== '' && (
        <Message type="error" className="push-notifications__error">
          {error}
        </Message>
      )}
    </div>
  );
};

export default PushNotifications;
