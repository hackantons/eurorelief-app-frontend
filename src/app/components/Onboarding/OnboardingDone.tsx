import React from 'react';
import { useIntl } from 'react-intl';

import './OnboardingDone.css';
import { Button, Icon } from '@app/theme';

const OnboardingDone = ({
  className = '',
  setIdentity,
}: {
  className?: string;
  setIdentity: Function;
}) => {
  const { formatMessage } = useIntl();
  const [steps, setSteps] = React.useState<number>(0);

  React.useEffect(() => {
    let step = steps;
    setInterval(() => {
      step++;
      setSteps(step);
    }, 2000);
  }, []);

  return (
    <div className={`${className} onboarding-done`}>
      <div className="onboarding-done__inner">
        <h1 className="onboarding-done__title">
          {formatMessage({ id: 'onboarding.done.title' })}
        </h1>
        <p className="onboarding-done__desc" aria-hidden={steps < 1}>
          {formatMessage({ id: 'onboarding.done.desc1' })}
        </p>
        <p className="onboarding-done__desc" aria-hidden={steps < 2}>
          {formatMessage({ id: 'onboarding.done.desc2' })}
        </p>
        <p className="onboarding-done__desc" aria-hidden={steps < 3}>
          <Button
            onClick={() => {
              setIdentity();
            }}
            className="onboarding-done__button"
          >
            {formatMessage({ id: 'onboarding.done.button' })}
          </Button>
        </p>
      </div>
      <Icon icon="fa/smiley" className="onboarding-done__smiley" />
    </div>
  );
};

export default OnboardingDone;
