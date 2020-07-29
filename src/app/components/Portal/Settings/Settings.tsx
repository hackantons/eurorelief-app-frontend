import React from 'react';
import { useIntl } from 'react-intl';

import './Settings.css';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { settingsDB } from '@app/store/idb';

import { Button } from '@app/theme';
import { actions } from '@app/store';

const Settings = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { auth }: State = useStoreState(['auth']);
  const { setAuth } = useActions(actions);

  return (
    <div className={`${className} settings`}>
      <p>
        {formatMessage({ id: 'account.phone' }, { phone: auth && auth.id })}
      </p>

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
    </div>
  );
};

export default Settings;
