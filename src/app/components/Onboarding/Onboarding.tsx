import React from 'react';
import { Button } from '@app/theme';
import ChooseLanguage from '@comp/Onboarding/ChooseLanguage';
import { useIntl } from 'react-intl';

import './Onboarding.css';
import DocumentType from '@comp/Onboarding/DocumentType';
import ChooseKANumber from '@comp/Onboarding/ChooseKANumber';

const Onboarding = ({ className = '' }: { className?: string }) => {
  const [progress, setProgress] = React.useState<number>(0);
  const [documentType, setDocumentType] = React.useState<string>(null);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const { formatMessage } = useIntl();

  const saveSetProgress = (next: number) =>
    setProgress(next >= steps.length ? steps.length - 1 : next);

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
          />
        ),
        phone: <p>Test</p>,
        install: <p>Test</p>,
        notification: <p>Test</p>,
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
