import React from 'react';

import { Button, Message } from '@app/theme';
import { useIntl } from 'react-intl';
import { getPushKey, putSubscription } from '@app/vendor/api';

import './PushNotifications.css';

const PushNotifications = ({
  className = '',
  nextStep,
}: {
  className?: string;
  nextStep: Function;
}) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [swRegistration, setSwRegistration] = React.useState<any>(null);
  const [applicationServerKey, setApplicationServerKey] = React.useState<any>(
    null
  );
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      nextStep();
    }
    Promise.all([navigator.serviceWorker.getRegistration(), getPushKey()]).then(
      ([reg, response]) => {
        if (!reg) {
          nextStep();
        } else {
          setSwRegistration(reg);
          setApplicationServerKey(new Uint8Array(Object.values(response.data)));
        }
      }
    );
  }, []);

  return (
    <div className={`${className} push-notifications`}>
      <Button
        onClick={() => {
          setLoading(true);
          swRegistration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey,
            })
            .then(subscription => {
              subscription = subscription.toJSON();
              putSubscription({
                endpoint: subscription.endpoint,
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
              })
                .then(() => {
                  setLoading(false);
                  nextStep();
                })
                .catch(() => setError(formatMessage({ id: 'general.error' })));
            })
            .catch(() => {
              setError(formatMessage({ id: 'onboarding.notification.failed' }));
              //              nextStep();
            });
        }}
        red
        disabled={swRegistration === null || loading}
        loading={loading}
      >
        {formatMessage({ id: 'onboarding.push.activate' })}
      </Button>
      {error !== '' && (
        <Message type="error" className="push-notifications__error">
          {error}
        </Message>
      )}
    </div>
  );
};

export default PushNotifications;
