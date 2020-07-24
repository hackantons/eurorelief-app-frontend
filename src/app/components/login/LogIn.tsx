import React, { useState } from 'react';
import {
  Form,
  FormControls,
  FormField,
  FormFieldset,
  InputText,
  Button,
} from '@app/theme';
import { useIntl } from 'react-intl';
import { logIn } from '@app/vendor/api';
import { settingsDB } from '@app/store/idb';

const LogIn = ({
  setAuth,
  className = '',
}: {
  setAuth: Function;
  className?: string;
}) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState<boolean>(false);

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
          .finally(() => setLoading(false));
      }}
      className={className}
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
    </Form>
  );
};

export default LogIn;
