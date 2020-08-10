import React from 'react';

import './Regnumber.css';

const MAX_NUMBER = 10;

const InputRegnumber = ({
  value: initValue,
  setValue: passValueUp,
  name,
  loading,
}: {
  value: string;
  setValue: Function;
  name: string;
  loading: boolean;
}) => {
  const prefixRef = React.useRef<HTMLInputElement>(null);
  const numberRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>(initValue);

  const processedValue = React.useMemo<[string, string]>(() => {
    const parts = value.split('/');
    const number = parts.length < 2 ? '' : parts[1].slice(0, MAX_NUMBER);
    const prefix = parts[0].replace(/\D+/g, '').slice(0, 2);
    passValueUp(prefix + '/' + number);
    return [prefix, number];
  }, [value]);

  const prefix = React.useMemo<string>(() => processedValue[0], [
    processedValue,
  ]);
  const number = React.useMemo<string>(() => processedValue[1], [
    processedValue,
  ]);

  return (
    <div className="regnumber">
      <div className="regnumber__input">
        <input
          className="regnumber__input-prefix"
          type="number"
          placeholder="05"
          value={prefix}
          name={`${name}-prefix`}
          // @ts-ignore
          ref={prefixRef}
          disabled={loading}
          onInput={e => {
            let val = (e.target as HTMLInputElement).value;
            setValue(val + '/' + processedValue[1]);
            if (val.length >= 2) {
              // @ts-ignore
              numberRef.current.focus();
            }
          }}
        />
        <span className="regnumber__devider">/</span>
        <input
          className="regnumber__input-number"
          type="number"
          placeholder={new Array(MAX_NUMBER).fill('0').join('')}
          name={`${name}-number`}
          value={number}
          // @ts-ignore
          ref={numberRef}
          disabled={loading}
          onInput={e => {
            setValue(
              processedValue[0] + '/' + (e.target as HTMLInputElement).value
            );
          }}
        />
      </div>
    </div>
  );
};

export default InputRegnumber;
