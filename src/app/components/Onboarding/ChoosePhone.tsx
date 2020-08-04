import React from 'react';
import { InputText, Message } from '@app/theme';
import { useIntl } from 'react-intl';

import './ChoosePhone.css';

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

  return (
    <div className={`${className} choose-phone`}>
      <p>{formatMessage({ id: 'onboarding.phone.desc' })}</p>
      <InputText
        name="phone"
        label={formatMessage({ id: 'onboarding.phone.label' })}
        disabled={loading}
        onInput={e => setPhone((e.target as HTMLInputElement).value)}
      />
      {error !== '' && <Message type="error">{error}</Message>}
    </div>
  );
};

export default ChoosePhone;
