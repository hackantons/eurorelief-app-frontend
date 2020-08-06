import React from 'react';

import { useIntl } from 'react-intl';
import { useActions } from 'unistore-hooks';

import { actions } from '@app/store';
import { Identity } from '@app/store/types';

import { Button, Icon } from '@app/theme';
import ChooseLanguage from '@comp/Onboarding/ChooseLanguage';
import DocumentType from '@comp/Onboarding/DocumentType';
import RegistrationNumber from '@comp/Onboarding/RegistrationNumber';
import ChoosePhone from '@comp/Onboarding/ChoosePhone';
import Install from '@comp/Onboarding/Install';
import PushNotifications from '@comp/Onboarding/PushNotifications';
import OnboardingDone from '@comp/Onboarding/OnboardingDone';
import { settingsDB } from '@app/store/idb';
import {
  createUser,
  fetchUser,
  resolveCampID,
  updateUser,
} from '@app/authentication/network';
import { doSignIn } from '@app/authentication/actions';

import './Onboarding.css';
import { getPushKey } from '@app/vendor/api';

const PROGRESS_STATES = {
  WELCOME: 'welcome',
  DOCUMENT: 'document',
  PAPER: 'paper',
  PHONE: 'phone',
  INSTALL: 'install',
  PUSH: 'push',
  DONE: 'done',
};

const Onboarding = ({ className = '' }: { className?: string }) => {
  const [progress, setProgress] = React.useState<string>(
    Object.values(PROGRESS_STATES)[0]
  );
  const [documentType, setDocumentType] = React.useState<string>(null);
  const [id, setId] = React.useState<string>(null);
  const [phone, setPhone] = React.useState<string>(null);
  const [error, setError] = React.useState<string>('');
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
  const [identity, setIdentity] = React.useState<Identity>(null);
  const [swRegistration, setSwRegistration] = React.useState<any>(null);
  const [applicationServerKey, setApplicationServerKey] = React.useState<any>(
    null
  );
  const { formatMessage } = useIntl();
  const { setIdentity: setStoreIdentity } = useActions(actions);

  React.useEffect(() => {
    Promise.all([navigator.serviceWorker.getRegistration(), getPushKey()]).then(
      ([reg, response]) => {
        setSwRegistration(reg);
        setApplicationServerKey(new Uint8Array(Object.values(response.data)));
      }
    );
  }, []);

  const nextStep = () => {
    const steps = Object.values(PROGRESS_STATES);
    setProgress(steps[steps.indexOf(progress) + 1]);
  };

  const prevStep = () => {
    const steps = Object.values(PROGRESS_STATES);
    setProgress(steps[steps.indexOf(progress) - 1]);
  };

  const BackButton = () => (
    <button className="onboarding__back" onClick={prevStep}>
      <Icon icon="mdi/chevron-down" rotate={90} />{' '}
      {formatMessage({ id: 'onboarding.back' })}
    </button>
  );

  const SkipButton = () => (
    <Button className="onboarding__skip" onClick={nextStep} small>
      {formatMessage({ id: 'onboarding.skip' })}
    </Button>
  );

  React.useEffect(() => {
    setError('');
  }, [progress]);

  const signUp = (id): Promise<Identity> =>
    new Promise((resolve, reject) =>
      resolveCampID(id)
        .then(uuid => {
          createUser(uuid)
            .then(({ user, password }) => {
              Promise.all([
                settingsDB.set('user', user),
                settingsDB.set('password', password),
              ])
                .then(() => {
                  doSignIn()
                    .then(() => {
                      fetchUser()
                        .then(identity => resolve(identity))
                        .catch(() =>
                          reject(formatMessage({ id: 'form.error.general' }))
                        );
                    })
                    .catch(() =>
                      reject(formatMessage({ id: 'form.error.general' }))
                    );
                })
                .catch(() =>
                  reject(formatMessage({ id: 'form.error.general' }))
                );
            })
            .catch(() =>
              reject(formatMessage({ id: 'onboarding.paper.failed' }))
            );
        })
        .catch(() =>
          reject(formatMessage({ id: 'onboarding.paper.number.invalid' }))
        )
    );

  const updatePhone = (): Promise<Identity> =>
    new Promise((resolve, reject) =>
      updateUser({ phone })
        .then(identity => resolve(identity))
        .catch(() => reject(formatMessage({ id: 'onboarding.phone.error' })))
    );

  return (
    <div className={`${className} onboarding`}>
      {progress === PROGRESS_STATES.WELCOME && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.welcome.title' })}</h1>
          <ChooseLanguage className="onboarding__content" />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.DOCUMENT && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.document.title' })}</h1>
          <BackButton />
          <DocumentType
            nextStep={nextStep}
            setDocumentType={setDocumentType}
            className="onboarding__content"
          />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.PAPER && (
        <React.Fragment>
          <h1>
            {formatMessage({ id: `onboarding.paper.${documentType}.title` })}
          </h1>
          <BackButton />
          <RegistrationNumber
            documentType={documentType}
            className="onboarding__content"
            setId={setId}
            error={error}
            loading={buttonLoading}
          />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.PHONE && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.phone.title' })}</h1>
          <BackButton />
          <ChoosePhone
            className="onboarding__content"
            setPhone={setPhone}
            error={error}
            loading={buttonLoading}
          />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.INSTALL && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.install.title' })}</h1>
          <BackButton />
          <Install className="onboarding__content" nextStep={nextStep} />
          <SkipButton />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.PUSH && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.push.title' })}</h1>
          <BackButton />
          <PushNotifications
            className="onboarding__content"
            nextStep={nextStep}
            swRegistration={swRegistration}
            applicationServerKey={applicationServerKey}
            error={error}
          />
          <SkipButton />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.DONE && (
        <React.Fragment>
          <OnboardingDone
            setIdentity={() => {
              setStoreIdentity(identity);
            }}
          />
        </React.Fragment>
      )}
      {progress !== PROGRESS_STATES.DOCUMENT &&
        progress !== PROGRESS_STATES.DONE && (
          <Button
            className="onboarding__progress"
            onClick={() => {
              setError('');
              setButtonLoading(true);
              if (progress === PROGRESS_STATES.PAPER) {
                signUp(id)
                  .then(identity => {
                    setButtonLoading(false);
                    setIdentity(identity);
                    nextStep();
                  })
                  .catch(e => {
                    setButtonLoading(false);
                    setError(e);
                  });
              } else if (progress === PROGRESS_STATES.PHONE) {
                updatePhone()
                  .then(identity => {
                    setButtonLoading(false);
                    setIdentity(identity);
                    nextStep();
                  })
                  .catch(e => {
                    setButtonLoading(false);
                    setError(e);
                  });
              } else if (progress === PROGRESS_STATES.INSTALL) {
                // @ts-ignore
                window.installPrompt &&
                  // @ts-ignore
                  window.installPrompt.prompt().then(() => {
                    setButtonLoading(false);
                    nextStep();
                  });
              } else {
                setButtonLoading(false);
                nextStep();
              }
            }}
            icon="mdi/chevron-down"
            red
            disabled={buttonLoading}
            loading={buttonLoading}
          >
            {formatMessage({
              id: `onboarding.${progress}.next`,
            })}
          </Button>
        )}
    </div>
  );
};

export default Onboarding;
