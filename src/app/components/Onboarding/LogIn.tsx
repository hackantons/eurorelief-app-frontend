import React, { useState } from 'react';
import {
  Form,
  FormControls,
  FormField,
  FormFieldset,
  InputText,
  Button,
  Message,
} from '@app/theme';
import { useIntl } from 'react-intl';
import { logIn } from '@app/vendor/api';
import { settingsDB } from '@app/store/idb';

import './LogIn.css';

const LogIn = ({
  setAuth,
  className = '',
}: {
  setAuth: Function;
  className?: string;
}) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  return (
    <Form
      onSubmit={data => {
        setLoading(true);
        logIn({
          tel: data.number,
          password: data.password,
        })
          .then(({ jwt, id }) => {
            settingsDB.set('jwt', jwt);
            setAuth({ id });
          })
          .catch(() => setError(formatMessage({ id: 'login.error.invalid' })))
          .finally(() => setLoading(false));
      }}
      className={`${className} login`}
    >
      <FormFieldset stacked>
        <FormField
          name="number"
          label={formatMessage({ id: 'login.number' })}
          component={InputText}
          register={{
            required: formatMessage({ id: 'form.validate.required' }),
          }}
        />
        <FormField
          name="password"
          label={formatMessage({ id: 'login.password' })}
          component={InputText}
          register={{
            required: formatMessage({ id: 'form.validate.required' }),
          }}
        />
      </FormFieldset>
      <FormControls>
        <Button type="submit" loading={loading} disabled={loading}>
          {formatMessage({ id: 'login.submit' })}
        </Button>
      </FormControls>
      {error !== '' && (
        <Message type="error" className="login__error">
          {error}
        </Message>
      )}
    </Form>
  );
};

export default LogIn;
