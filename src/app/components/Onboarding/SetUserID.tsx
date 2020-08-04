import React from 'react';
import { useIntl } from 'react-intl';

import { Loader, Message } from '@app/theme';

import './SetUserID.css';

const MAX_NUMBER = 8;

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
  const prefixRef = React.useRef();
  const numberRef = React.useRef();
  const { formatMessage } = useIntl();
  const [prefix, setPrefix] = React.useState<string>('');
  const [number, setNumber] = React.useState<string>('');

  React.useEffect(() => {
    if (prefixRef.current) {
      // @ts-ignore
      prefixRef.current.focus();
    }
  }, [prefixRef]);

  React.useEffect(() => {
    setId(`${prefix.padStart(2, '0')}/${number}`);
  }, [prefix, number]);

  return (
    <div className={`${className} set-user-id`}>
      <p>
        1. {formatMessage({ id: 'onboarding.number.step1.' + documentType })}
      </p>
      <p>2. {formatMessage({ id: 'onboarding.number.step2' })}</p>
      <div
        className={`set-user-id__input ${
          error !== '' ? 'set-user-id__input--error' : ''
        }`}
      >
        <input
          className="set-user-id__input-prefix"
          type="number"
          placeholder="05"
          max={2}
          value={prefix}
          name="prefix"
          // @ts-ignore
          ref={prefixRef}
          disabled={loading}
          onInput={e => {
            const max = 2;
            let val = (e.target as HTMLInputElement).value;
            if (val.length > max) {
              val = val.slice(0, max);
            }
            if (val.length >= max) {
              // @ts-ignore
              numberRef.current.focus();
            }
            (e.target as HTMLInputElement).value = val;
            setPrefix(val);
          }}
        />
        <span className="set-user-id__input-devider">/</span>
        <input
          className="set-user-id__input-number"
          type="text"
          placeholder={new Array(MAX_NUMBER).fill('0').join('')}
          max={MAX_NUMBER}
          name="number"
          value={number}
          // @ts-ignore
          ref={numberRef}
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
          className={`set-user-id__loader ${
            loading ? 'set-user-id__loader--show' : ''
          }`}
        />
      </div>
      {error !== '' && <Message type="error">{error}</Message>}
    </div>
  );
};

export default SetUserID;
