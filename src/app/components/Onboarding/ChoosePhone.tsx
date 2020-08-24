import React from 'react';
import { InputText, Message } from '@app/theme';
import { useIntl } from 'react-intl';

import './ChoosePhone.css';
import { isValidPhoneNumber } from '@app/vendor/helpers';

const ChoosePhone = ({
  className = '',
  setPhone,
  error,
  loading = false,
}: {
  className?: string;
  setPhone: Function;
  error: string;
  loading: boolean;
}) => {
  const { formatMessage } = useIntl();
  const [number, setNumber] = React.useState<string>('');

  React.useEffect(() => {
    setPhone(number);
  }, [number]);

  return (
    <div className={`${className} choose-phone`}>
      <p>{formatMessage({ id: 'onboarding.phone.desc' })}</p>
      <InputText
        name="phone"
        label={formatMessage({ id: 'onboarding.phone.label' })}
        disabled={loading}
        value={number}
        onKeyup={e => {
          setNumber((e.target as HTMLInputElement).value);
        }}
      />
      {error !== '' && <Message type="error">{error}</Message>}
    </div>
  );
};

export default ChoosePhone;
