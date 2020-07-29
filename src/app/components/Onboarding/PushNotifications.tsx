import React from 'react';

import './PushNotifications.css';
import { Button } from '@app/theme';
import { useIntl } from 'react-intl';

const PushNotifications = ({
  className = '',
  nextStep,
}: {
  className?: string;
  nextStep: Function;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} push-notifications`}>
      <Button onClick={() => alert('Push')} red>
        {formatMessage({ id: 'onboarding.push.activate' })}
      </Button>
    </div>
  );
};

export default PushNotifications;
