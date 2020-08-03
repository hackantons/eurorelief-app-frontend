import React from 'react';
import { useStoreState, useActions } from 'unistore-hooks';

import { Button } from '@app/theme';
import { State } from '@app/store/types';
import { actions } from '@app/store';
import { locales } from '@app/intl';

import './ChooseLanguage.css';

const ChooseLanguage = ({ className = '' }: { className?: string }) => {
  const { intl }: State = useStoreState(['intl']);
  const { setLocale } = useActions(actions);

  React.useEffect(() => {
    // todo: check for browser lang
  }, []);

  return (
    <div className={`${className} choose-language`}>
      {Object.entries(locales).map(([key, locale]) => (
        <Button
          className="choose-language__lang"
          onClick={() => {
            setLocale(key);
          }}
          red={intl.locale === key}
          loading={intl.loading === key}
          disabled={intl.loading === key}
        >
          {locale[2]}
        </Button>
      ))}
    </div>
  );
};

export default ChooseLanguage;
