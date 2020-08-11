import React from 'react';
import { useIntl } from 'react-intl';

import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { Button } from '@app/theme';
import { getPushKey } from '@app/vendor/api';
import { subscribeToPush } from '@app/vendor/helpers';

import './PushBanner.css';

const PushBanner = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const [hidden, setHidden] = React.useState(true);
  const [swRegistration, setSwRegistration] = React.useState<any>(null);
  const [applicationServerKey, setApplicationServerKey] = React.useState<any>(
    null
  );
  const { offline }: State = useStoreState(['offline']);

  React.useEffect(() => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      Promise.all([navigator.serviceWorker.getRegistration(), getPushKey()])
        .then(([reg, response]) => {
          if (reg && 'pushManager' in reg) {
            setSwRegistration(reg);
            setApplicationServerKey(
              new Uint8Array(Object.values(response.data))
            );
          }
        })
        .catch(() => {});
    }
  }, []);

  React.useEffect(() => {
    if (swRegistration && applicationServerKey) {
      if (Notification.permission === 'default') {
        setHidden(false);
      } else if (Notification.permission === 'denied') {
        setHidden(false);
      } else if (Notification.permission === 'granted') {
        // update subscription
        subscribeToPush(swRegistration, applicationServerKey)
          .then(() => {})
          .catch(() => {});
      }
    }
  }, [swRegistration, applicationServerKey]);

  return (
    <Button
      className={`${className} push-banner`}
      aria-hidden={hidden || offline}
      icon="mdi/alert"
      red
      onClick={() => {
        subscribeToPush(swRegistration, applicationServerKey)
          .then(() => setHidden(true))
          .catch(() => alert(formatMessage({ id: 'form.error.general' })));
      }}
    >
      <p>
        <b>{formatMessage({ id: 'push.disabled.title' })}</b>
      </p>
      <p>{formatMessage({ id: 'push.disabled.desc' })}</p>
    </Button>
  );
};

export default PushBanner;
