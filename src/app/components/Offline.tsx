import React from 'react';
import { useIntl } from 'react-intl';
import { State } from '@app/store/types';
import { useStoreState } from 'unistore-hooks';

import './Offline.css';

const Offline = ({ className = '' }: { className: string }) => {
  const { formatMessage } = useIntl();
  const { offline }: State = useStoreState(['offline']);

  return (
    <div className={`${className} offline`} aria-hidden={!offline}>
      <p>{formatMessage({ id: 'offline.title' })}</p>
    </div>
  );
};

export default Offline;
