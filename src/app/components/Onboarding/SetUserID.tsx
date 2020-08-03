import React from 'react';
import { useIntl } from 'react-intl';

import { Loader, Message } from '@app/theme';

import './SetUserID.css';

const MAX_NUMBER = 6;
const FORM_STATES = {
  NEUTRAL: 'NEUTRAL',
  ERROR: 'ERROR',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
};

const SetUserID = ({
  className = '',
  documentType,
  setId,
  error,
  loading = false,
}: {
  className?: string;
  documentType: string;
  setId: Function;
  error: string;
  loading: boolean;
}) => {
  const { formatMessage } = useIntl();
  const [prefix, setPrefix] = React.useState<string>('05');
  const [number, setNumber] = React.useState<string>('');

  React.useEffect(() => {
    setId(`${prefix.padStart(2, '0')}/${number}`);
  }, [prefix, number]);

  return (
    <div className={`${className} choose-kanumber`}>
      <p>
        1. {formatMessage({ id: 'onboarding.number.step1.' + documentType })}
      </p>
      <p>2. {formatMessage({ id: 'onboarding.number.step2' })}</p>
      <div
        className={`choose-kanumber__input ${
          error !== '' ? 'choose-kanumber__input--error' : ''
        }`}
      >
        <input
          className="choose-kanumber__input-prefix"
          type="number"
          placeholder="05"
          max={2}
          value={prefix}
          name="prefix"
          disabled={loading}
          onInput={e => {
            const max = 2;
            let val = (e.target as HTMLInputElement).value;
            if (val.length > max) {
              val = val.slice(0, max);
            }
            (e.target as HTMLInputElement).value = val;
            setPrefix(val);
          }}
        />
        <span className="choose-kanumber__input-devider">/</span>
        <input
          className="choose-kanumber__input-number"
          type="text"
          placeholder={new Array(MAX_NUMBER).fill('0').join('')}
          max={MAX_NUMBER}
          name="number"
          value={number}
          disabled={loading}
          onInput={e => {
            const max = MAX_NUMBER;
            let val = (e.target as HTMLInputElement).value;
            if (val.length > max) {
              val = val.slice(0, max);
            }
            (e.target as HTMLInputElement).value = val;
            setNumber(val);
          }}
        />
        <Loader
          className={`choose-kanumber__loader ${
            loading ? 'choose-kanumber__loader--show' : ''
          }`}
        />
      </div>
      {error !== '' && <Message type="error">{error}</Message>}
    </div>
  );
};

export default SetUserID;
