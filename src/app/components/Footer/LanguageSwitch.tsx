import React from 'react';
import { useIntl } from 'react-intl';
import { State } from '@app/store/types';
import { actions } from '@app/store';
import { useStoreState, useActions } from 'unistore-hooks';
import { locales } from '@app/intl';
import { Icon, Modal } from '@app/theme';

import './LanguageSwitch.css';

const LanguageSwitch = ({ className = '' }: { className?: string }) => {
  const [modal, setModal] = React.useState<boolean>(false);
  const { formatMessage } = useIntl();

  const { intlLocale }: State = useStoreState(['intlLocale']);
  const { setLocale } = useActions(actions);

  return (
    <div className={`${className} language-switch`}>
      {formatMessage(
        {
          id: 'language',
        },
        {
          lang: (
            <button
              onClick={() => setModal(true)}
              className="language-switch__button"
            >
              {locales[intlLocale][2]}
              <Icon icon="mdi/chevron-down" />
            </button>
          ),
        }
      )}
      {modal && (
        <Modal
          title={formatMessage({ id: 'language.change' })}
          onClose={() => setModal(false)}
          maxWidth={320}
        >
          <div className="language-switch__list">
            {Object.entries(locales).map(([key, locale]) => (
              <button
                className={`language-switch__language ${
                  intlLocale === key ? 'language-switch__language--active' : ''
                }`}
                onClick={() => {
                  setLocale(key);
                  setModal(false);
                }}
              >
                {locale[2]}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LanguageSwitch;
