import React from 'react';
import { useStoreState, useActions } from 'unistore-hooks';

import { Button } from '@app/theme';
import { State } from '@app/store/types';
import { actions } from '@app/store';
import { locales } from '@app/intl';

import './ChooseLanguage.css';

const ChooseLanguage = ({ className = '' }: { className?: string }) => {
  const { intlLocale }: State = useStoreState(['intlLocale']);
  const { setLocale } = useActions(actions);

  return (
    <div className={`${className} choose-language`}>
      {Object.entries(locales).map(([key, locale]) => (
        <Button
          className="choose-language__lang"
          onClick={() => {
            setLocale(key);
          }}
          red={intlLocale === key}
        >
          {locale[2]}
        </Button>
      ))}
    </div>
  );
};

export default ChooseLanguage;
