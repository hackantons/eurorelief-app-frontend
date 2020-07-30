import React from 'react';
import { useIntl } from 'react-intl';
import { useStoreState, useActions } from 'unistore-hooks';

import { State } from '@app/store/types';
//import { settingsDB } from '@app/store/idb';
import { Button, ButtonGroup } from '@app/theme';
import { actions } from '@app/store';

import './Settings.css';

const Settings = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { identity }: State = useStoreState(['identity']);
  const { setAuth } = useActions(actions);

  return (
    <div className={`${className} settings`}>
      <p className="settings__phone">
        {formatMessage(
          { id: 'account.phone' },
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
      </ButtonGroup>
    </div>
  );
};

export default Settings;
