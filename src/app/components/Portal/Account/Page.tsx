import React from 'react';
import { useIntl } from 'react-intl';

import './Page.css';
import { State } from '@app/store/types';
import { useStoreState, useActions } from 'unistore-hooks';
import { settingsDB } from '@app/store/idb';

import { Button } from '@app/theme';
import { actions } from '@app/store';

const AccountPage = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { auth }: State = useStoreState(['auth']);
  const { setAuth } = useActions(actions);

  return (
    <div className={`${className} account-page`}>
      <h1>{formatMessage({ id: 'navigation.account' })}</h1>
      <p>{formatMessage({ id: 'account.id' }, { id: auth && auth.id })}</p>
      <Button
        onClick={() => {
          setAuth(false);
          settingsDB.set('jwt', '');
        }}
      >
        {formatMessage({ id: 'account.logout' })}
      </Button>
    </div>
  );
};

export default AccountPage;
