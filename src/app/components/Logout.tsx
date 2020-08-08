import React from 'react';

import { useIntl } from 'react-intl';
import { Button, Modal } from '@app/theme';

import './Logout.css';
import { settingsDB } from '@app/store/idb';
import { actions } from '@app/store';
import { useActions } from 'unistore-hooks';

const Logout = ({ className = '' }: { className: string }) => {
  const { formatMessage } = useIntl();
  const [modal, setModal] = React.useState(false);
  const { setIdentity } = useActions(actions);

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setModal(true);
        }}
        className={className}
        small
      >
        {formatMessage({ id: 'logout' })}
      </Button>
      {modal && (
        <Modal
          title={formatMessage({ id: 'logout.title' })}
          onClose={() => setModal(false)}
          red
          className="logout-modal"
        >
          <p className="text--big text--center">
            {formatMessage({ id: 'logout.desc' })}
          </p>
          <p className="logout-modal__button">
            <Button
              onClick={() => {
                Promise.all([
                  settingsDB.delete('jwt'),
                  settingsDB.delete('password'),
                  settingsDB.delete('user'),
                ]).then(() => {
                  /* cleared */
                });
                setIdentity(null);
              }}
            >
              {formatMessage({ id: 'portal.logout' })}
            </Button>
            <Button onClick={() => setModal(false)} red>
              {formatMessage({ id: 'logout.back' })}
            </Button>
          </p>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Logout;
