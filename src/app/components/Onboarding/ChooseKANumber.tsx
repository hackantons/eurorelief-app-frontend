import React from 'react';
import { useIntl } from 'react-intl';

import './ChooseKANumber.css';

const ChooseKANumber = ({
  className = '',
  setButtonDisabled,
}: {
  className?: string;
  setButtonDisabled: Function;
}) => {
  const { formatMessage } = useIntl();
  const [prefix, setPrefix] = React.useState<string>('05');
  const [number, setNumber] = React.useState<string>('');

  React.useEffect(() => {
    setButtonDisabled(true);
    return () => {
      setButtonDisabled(false);
    };
  }, []);

  return (
    <div className={`${className} choose-kanumber`}>
      <p>1. bla</p>
      <p>2. {formatMessage({ id: 'onboarding.number.step2' })}</p>
      <div className="choose-kanumber__input">
        <input
          className="choose-kanumber__input-prefix"
          type="number"
          placeholder="05"
          value={prefix}
          onKeyUp={e => {
            setPrefix(
              (e.target as HTMLInputElement).value.replace(/[^0-9\.]+/g, '')
            );
          }}
        />
        <span className="choose-kanumber__input-devider">/</span>
        <input
          className="choose-kanumber__input-number"
          type="number"
          placeholder="00000000"
          value={number}
          onKeyUp={e => {
            setNumber(
              (e.target as HTMLInputElement).value.replace(/[^0-9\.]+/g, '')
            );
          }}
        />
      </div>
    </div>
  );
};

export default ChooseKANumber;
