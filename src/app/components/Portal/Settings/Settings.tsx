import React from 'react';
import { useIntl } from 'react-intl';
import { useStoreState, useActions } from 'unistore-hooks';

import { State } from '@app/store/types';
import {
  Button,
  ButtonGroup,
  Form,
  FormControls,
  FormField,
  FormFieldset,
  InputRegnumber,
  Message,
  Modal,
} from '@app/theme';
import { actions } from '@app/store';

import './Settings.css';
import { postUser } from '@app/vendor/api';

const Settings = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const { identity }: State = useStoreState(['identity']);
  const { setIdentity } = useActions(actions);
  const [modal, setModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  return (
    <div className={`${className} settings`}>
      <p className="settings__phone">
        {formatMessage(
          { id: 'portal.settings.phone' },
          {
            phone: (
              <b className="settings__phone-number">
                {identity.phone
                  ? identity.phone
                  : formatMessage({ id: 'portal.settings.nophone' })}
              </b>
            ),
          }
        )}
      </p>
      <ButtonGroup>
        <Button
          className="notifications-info__button"
          onClick={() => setModal(true)}
        >
          {formatMessage({ id: 'portal.settings.change' })}
        </Button>
      </ButtonGroup>
      {modal && (
        <Modal
          title={formatMessage({ id: 'onboarding.phone.title' })}
          onClose={() => setModal(false)}
        >
          <Form
            onSubmit={data => {
              console.log('DATA', data);
              return;
              setLoading(true);
              postUser({ phone: data.phone })
                .then(() => {
                  setLoading(false);
                  setIdentity({ ...identity, phone: data.phone });
                  setModal(false);
                })
                .catch(() => {
                  setError(formatMessage({ id: 'form.error.general' }));
                  setLoading(false);
                });
            }}
          >
            <FormFieldset stacked>
              <FormField
                name="regnumber"
                label={formatMessage({ id: 'portal.settings.regnr' })}
                component={InputRegnumber}
              />
              <FormField
                name="phone"
                label={formatMessage({ id: 'onboarding.phone.title' })}
                value={identity.phone}
              />
              <FormControls>
                <Button type="submit" loading={loading}>
                  {formatMessage({ id: 'onboarding.phone.next' })}
                </Button>
              </FormControls>
            </FormFieldset>
          </Form>
          {error !== '' && <Message type="error">{error}</Message>}
        </Modal>
      )}
    </div>
  );
};

export default Settings;
