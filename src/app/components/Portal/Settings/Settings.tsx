import React from 'react';
import { useIntl } from 'react-intl';
import { useStoreState, useActions } from 'unistore-hooks';

import { State } from '@app/store/types';
import { Button, ButtonGroup } from '@app/theme';
import { actions } from '@app/store';
import { settingsDB } from '@app/store/idb';

import './Settings.css';

const Settings = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { identity }: State = useStoreState(['identity']);
  const { setIdentity, setLocale } = useActions(actions);

  return (
    <div className={`${className} settings`}>
      <p className="settings__phone">
        {formatMessage(
          { id: 'portal.settings.phone' },
          {
            phone: (
              <b className="settings__phone-number">
                {identity
                  ? identity.phone
                  : formatMessage({ id: 'settings.noPhone' })}
              </b>
            ),
          }
        )}
      </p>
      <ButtonGroup>
        <Button
          className="notifications-info__button"
          onClick={() => alert('Noch nicht implementiert')}
        >
          {formatMessage({ id: 'settings.change' })}
        </Button>

        <Button
          className="notifications-info__button"
          onClick={() => alert('Noch nicht implementiert')}
        >
          {formatMessage({ id: 'settings.leave' })}
        </Button>
        <button
          onClick={() => {
            settingsDB.set('jwt', '');
            settingsDB.set('password', '');
            settingsDB.set('user', '');
            setIdentity(null);
          }}
        >
          logout
        </button>
        <button onClick={() => setLocale('de')}>DE</button>
      </ButtonGroup>
    </div>
  );
};

export default Settings;
