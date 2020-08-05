import React from 'react';

import { useIntl } from 'react-intl';

import './Install.css';

const Install = ({
  className = '',
  nextStep,
}: {
  className?: string;
  nextStep: Function;
}) => {
  const { formatMessage } = useIntl();
  React.useEffect(() => {
    // @ts-ignore
    !window.installPrompt && nextStep();
  }, []);
  return (
    <div className={`${className} install`}>
      <p>{formatMessage({ id: 'onboarding.install.desc' })}</p>
      <ul>
        <li>{formatMessage({ id: 'onboarding.install.desc.step1' })}</li>
        <li>{formatMessage({ id: 'onboarding.install.desc.step2' })}</li>
      </ul>
    </div>
  );
};

export default Install;
