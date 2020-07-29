import React from 'react';
import { useIntl } from 'react-intl';

import './ChooseKANumber.css';
import { Icon, Loader, Message } from '@app/theme';
import { checkKANumber } from '@app/vendor/api';

const MAX_NUMBER = 6;
const FORM_STATES = {
  NEUTRAL: 'NEUTRAL',
  ERROR: 'ERROR',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
};

const ChooseKANumber = ({
  className = '',
  setButtonDisabled,
  documentType,
}: {
  className?: string;
  setButtonDisabled: Function;
  documentType: string;
}) => {
  const { formatMessage } = useIntl();
  const [prefix, setPrefix] = React.useState<string>('05');
  const [number, setNumber] = React.useState<string>('');
  const [formState, setFormState] = React.useState<string>(
    Object.values(FORM_STATES)[0]
  );
  const [formError, setFormError] = React.useState<string>('');

  React.useEffect(() => {
    setButtonDisabled(true);
    return () => {
      setButtonDisabled(false);
    };
  }, []);

  React.useEffect(() => {
    if (prefix.length === 2 && number.length === MAX_NUMBER) {
      setFormState(FORM_STATES.PENDING);
      checkKANumber(`${prefix}/${number}`)
        .then(() => setFormState(FORM_STATES.SUCCESS))
        .catch(error => {
          setFormError(error);
          setFormState(FORM_STATES.ERROR);
        });
    } else {
      setFormState(FORM_STATES.NEUTRAL);
    }
  }, [prefix, number]);

  React.useEffect(() => {
    setButtonDisabled(formState !== FORM_STATES.SUCCESS);
  }, [formState]);

  return (
    <div className={`${className} choose-kanumber`}>
      <p>
        1. {formatMessage({ id: 'onboarding.number.step1.' + documentType })}
      </p>
      <p>2. {formatMessage({ id: 'onboarding.number.step2' })}</p>
      <div
        className={`choose-kanumber__input ${
          formState === FORM_STATES.ERROR ? 'choose-kanumber__input--error' : ''
        }`}
      >
        <input
          className="choose-kanumber__input-prefix"
          type="number"
          placeholder="05"
          max={2}
          value={prefix}
          name="prefix"
          disabled={formState === FORM_STATES.PENDING}
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
          disabled={formState === FORM_STATES.PENDING}
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
            formState === FORM_STATES.PENDING
              ? 'choose-kanumber__loader--show'
              : ''
          }`}
        />
        <Icon
          icon="mdi/check"
          className={`choose-kanumber__checked ${
            formState === FORM_STATES.SUCCESS
              ? 'choose-kanumber__checked--show'
              : ''
          }`}
        />
      </div>
      {formState === FORM_STATES.ERROR && (
        <Message type="error">
          {formError || formatMessage({ id: 'general.error' })}
        </Message>
      )}
    </div>
  );
};

export default ChooseKANumber;
