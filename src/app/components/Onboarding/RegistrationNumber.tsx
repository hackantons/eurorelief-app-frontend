import React from 'react';
import { useIntl } from 'react-intl';

import {
  Form,
  FormField,
  FormFieldset,
  InputRegnumber,
  Message,
} from '@app/theme';

import './RegistrationNumber.css';

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
  const { formatMessage } = useIntl();

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
      <Form onSubmit={data => setId(data.regnumber)}>
        <FormFieldset stacked>
          <FormField
            name="regnumber"
            label=""
            component={InputRegnumber}
            disabled={loading}
            value="05/"
            onValueChanged={newValue => setId(newValue)}
          />
        </FormFieldset>
      </Form>
      {error !== '' && <Message type="error">{error}</Message>}
    </div>
  );
};

export default RegistrationNumber;
