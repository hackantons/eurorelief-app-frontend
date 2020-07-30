import React from 'react';

import { Button } from '@app/theme';
import { useIntl } from 'react-intl';

import './Install.css';

const Install = ({
  className = '',
  nextStep,
}: {
  className?: string;
  nextStep: Function;
}) => {
  const [showStepTwo, setShowStepTwo] = React.useState<boolean>(false);
  const { formatMessage } = useIntl();
  React.useEffect(() => {
    // @ts-ignore
    !window.installPrompt && nextStep();
  }, []);
  return (
    <div className={`${className} install`}>
      {showStepTwo ? (
        <p>{formatMessage({ id: 'onboarding.install.step2' })}</p>
      ) : (
        <Button
          className="install__button"
          onClick={() => {
            setShowStepTwo(true);
            // @ts-ignore
            window.installPrompt.prompt();
          }}
          red
        >
          {formatMessage({ id: 'onboarding.install' })}
        </Button>
      )}
    </div>
  );
};

export default Install;
