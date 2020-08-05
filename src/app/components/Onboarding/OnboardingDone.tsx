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
          {formatMessage({ id: 'onboarding.success.title' })}
        </h1>
        <p className="onboarding-done__desc" aria-hidden={steps < 0}>
          {formatMessage({ id: 'onboarding.success.desc1' })}
        </p>
        <p className="onboarding-done__desc" aria-hidden={steps < 1}>
          {formatMessage({ id: 'onboarding.success.desc2' })}
        </p>
        <p className="onboarding-done__desc" aria-hidden={steps < 2}>
          <Button
            onClick={() => {
              setIdentity();
            }}
            className="onboarding-done__button"
          >
            {formatMessage({ id: 'onboarding.success.next' })}
          </Button>
        </p>
      </div>
      <Icon icon="fa/smiley" className="onboarding-done__smiley" />
    </div>
  );
};

export default OnboardingDone;
