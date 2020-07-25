import React from 'react';
import { useIntl } from 'react-intl';

import { Button, Modal } from '@app/theme';

import './PushNotifications.css';

const PushNotifications = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const [modal, setModal] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
        className={`${className} push-notifications-button`}
        icon="mdi/notifications"
        round
        onClick={() => setModal(true)}
      />
      {modal && (
        <Modal
          title={formatMessage({ id: 'push.title' })}
          onClose={() => setModal(false)}
        >
          <p>{formatMessage({ id: 'push.about' })}</p>
          <Button onClick={() => alert('Noch nicht implementiert')}>
            {formatMessage({ id: 'push.register' })}
          </Button>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default PushNotifications;
