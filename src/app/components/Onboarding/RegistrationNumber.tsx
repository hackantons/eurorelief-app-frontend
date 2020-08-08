import React from 'react';
import { useIntl } from 'react-intl';

import { Loader, Message } from '@app/theme';

import './RegistrationNumber.css';

const MAX_NUMBER = 8;

const RegistrationNumber = ({
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
    <div className={`${className} registration-number`}>
      <p>
        1.{' '}
        {formatMessage({ id: `onboarding.paper.${documentType}.description` })}
      </p>
      <p>
        <img
          className="registration-number__image"
          src={`/assets/static/${documentType}-mark.jpg`}
        />
      </p>
      <p>2. {formatMessage({ id: 'onboarding.paper.step2' })}</p>
      <div
        className={`registration-number__input ${
          error !== '' ? 'registration-number__input--error' : ''
        }`}
      >
        <input
          className="registration-number__input-prefix"
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
        <span className="registration-number__input-devider">/</span>
        <input
          className="registration-number__input-number"
          type="number"
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
          className={`registration-number__loader ${
            loading ? 'registration-number__loader--show' : ''
          }`}
        />
      </div>
      {error !== '' && <Message type="error">{error}</Message>}
    </div>
  );
};

export default RegistrationNumber;
