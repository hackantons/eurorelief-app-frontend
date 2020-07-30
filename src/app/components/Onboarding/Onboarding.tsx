import React from 'react';
import { Button } from '@app/theme';
import ChooseLanguage from '@comp/Onboarding/ChooseLanguage';
import { useIntl } from 'react-intl';
import { useActions } from 'unistore-hooks';

import { actions } from '@app/store';
import { Identity } from '@app/store/types';
import DocumentType from '@comp/Onboarding/DocumentType';
import ChooseKANumber from '@comp/Onboarding/ChooseKANumber';
import ChoosePhone from '@comp/Onboarding/ChoosePhone';
import Install from '@comp/Onboarding/Install';
import PushNotifications from '@comp/Onboarding/PushNotifications';

import './Onboarding.css';

const Onboarding = ({ className = '' }: { className?: string }) => {
  const [progress, setProgress] = React.useState<number>(0);
  const [documentType, setDocumentType] = React.useState<string>(null);
  const [id, setId] = React.useState<string>(null);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [identity, setIdentity] = React.useState<Identity>(null);
  const { formatMessage } = useIntl();
  const { setIdentity: setStoreIdentity } = useActions(actions);

  const saveSetProgress = (next: number) => {
    if (next >= steps.length) {
      setStoreIdentity(identity);
    } else {
      setProgress(next >= steps.length ? steps.length - 1 : next);
    }
  };

  const steps = React.useMemo(
    () =>
      Object.entries({
        welcome: <ChooseLanguage className="onboarding__content" />,
        document: (
          <DocumentType
            nextStep={() => saveSetProgress(2)}
            setDocumentType={setDocumentType}
            className="onboarding__content"
          />
        ),
        papers: (
          <ChooseKANumber
            setButtonDisabled={setButtonDisabled}
            documentType={documentType}
            className="onboarding__content"
            setId={setId}
          />
        ),
        phone: (
          <ChoosePhone
            className="onboarding__content"
            setIdentity={setIdentity}
            id={id}
          />
        ),
        install: (
          <Install
            className="onboarding__content"
            nextStep={() => saveSetProgress(5)}
          />
        ),
        notification: (
          <PushNotifications
            className="onboarding__content"
            nextStep={() => saveSetProgress(6)}
          />
        ),
      }),
    [documentType]
  );

  const activeStep = React.useMemo(() => steps[progress], [steps, progress]);

  return (
    <div className={`${className} onboarding onboarding--${activeStep[0]}`}>
      <h1>{formatMessage({ id: 'onboarding.title.' + activeStep[0] })}</h1>
      {activeStep[1]}
      {progress !== 1 && (
        <Button
          className="onboarding__progress"
          onClick={() => saveSetProgress(progress + 1)}
          icon="mdi/chevron-down"
          red
          disabled={buttonDisabled}
        >
          {formatMessage({
            id: `onboarding.progress.${
              progress === 0
                ? 'start'
                : progress === steps.length - 1
                ? 'done'
                : 'next'
            }`,
          })}
        </Button>
      )}
    </div>
  );
};

export default Onboarding;
