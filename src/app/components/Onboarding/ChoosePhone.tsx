import React from 'react';
import { Form, InputText } from '@app/theme';
import { useIntl } from 'react-intl';

import './ChoosePhone.css';
import { settingsDB } from '@app/store/idb';

const ChoosePhone = ({
  className = '',
  setIdentity,
  id,
}: {
  className?: string;
  setIdentity: Function;
  id: string;
}) => {
  const [phone, setPhone] = React.useState<string>('');
  const { formatMessage } = useIntl();

  React.useEffect(() => {
    setIdentity({ id, phone: '123456789' });
  }, []);

  return (
    <div className={`${className} choose-phone`}>
      <p>{formatMessage({ id: 'onboarding.phone.desc' })}</p>
      <InputText
        name="phone"
        label={formatMessage({ id: 'onboarding.phone.label' })}
      />
      <p>ToDo: Submit?</p>
    </div>
  );
};

export default ChoosePhone;
