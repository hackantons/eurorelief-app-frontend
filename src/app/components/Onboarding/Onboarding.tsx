import React from 'react';

import { useIntl } from 'react-intl';
import { useActions } from 'unistore-hooks';

import { actions } from '@app/store';
import { Identity } from '@app/store/types';

import { Button } from '@app/theme';
import ChooseLanguage from '@comp/Onboarding/ChooseLanguage';
import DocumentType from '@comp/Onboarding/DocumentType';
import SetUserID from '@comp/Onboarding/SetUserID';
import ChoosePhone from '@comp/Onboarding/ChoosePhone';
import Install from '@comp/Onboarding/Install';
import PushNotifications from '@comp/Onboarding/PushNotifications';
import OnboardingDone from '@comp/Onboarding/OnboardingDone';

import './Onboarding.css';
import { settingsDB } from '@app/store/idb';
import {
  createUser,
  fetchUser,
  resolveCampID,
  updateUser,
} from '@app/authentication/network';
import { Promise } from 'es6-promise';
import { doSignIn } from '@app/authentication/actions';

const PROGRESS_STATES = {
  WELCOME: 'welcome',
  DOCUMENT: 'document',
  PAPERS: 'papers',
  PHONE: 'phone',
  INSTALL: 'install',
  NOTIFICATION: 'notification',
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
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
  const [identity, setIdentity] = React.useState<Identity>(null);
  const { formatMessage } = useIntl();
  const { setIdentity: setStoreIdentity } = useActions(actions);

  const nextStep = () => {
    const steps = Object.values(PROGRESS_STATES);
    setProgress(steps[steps.indexOf(progress) + 1]);
  };

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
                          reject(formatMessage({ id: 'general.error' }))
                        );
                    })
                    .catch(() =>
                      reject(formatMessage({ id: 'general.error' }))
                    );
                })
                .catch(() => reject(formatMessage({ id: 'general.error' })));
            })
            .catch(() =>
              reject(formatMessage({ id: 'onboarding.account.failed' }))
            );
        })
        .catch(() => reject(formatMessage({ id: 'onboarding.number.invalid' })))
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
          <h1>{formatMessage({ id: 'onboarding.title.welcome' })}</h1>
          <ChooseLanguage className="onboarding__content" />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.DOCUMENT && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.document' })}</h1>
          <DocumentType
            nextStep={nextStep}
            setDocumentType={setDocumentType}
            className="onboarding__content"
          />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.PAPERS && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.papers' })}</h1>
          <SetUserID
            documentType={documentType}
            className="onboarding__content"
            setId={setId}
            error={error}
            loading={buttonDisabled}
          />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.PHONE && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.phone' })}</h1>
          <ChoosePhone
            className="onboarding__content"
            setPhone={setPhone}
            error={error}
            loading={buttonDisabled}
          />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.INSTALL && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.install' })}</h1>
          <Install className="onboarding__content" nextStep={nextStep} />
        </React.Fragment>
      )}
      {progress === PROGRESS_STATES.NOTIFICATION && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.notification' })}</h1>
          <PushNotifications
            className="onboarding__content"
            nextStep={nextStep}
          />
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
              setButtonDisabled(true);
              if (progress === PROGRESS_STATES.PAPERS) {
                signUp(id)
                  .then(identity => {
                    setButtonLoading(false);
                    setButtonDisabled(false);
                    setIdentity(identity);
                    nextStep();
                  })
                  .catch(e => {
                    setButtonLoading(false);
                    setButtonDisabled(false);
                    setError(e);
                  });
              } else if (progress === PROGRESS_STATES.PHONE) {
                updatePhone()
                  .then(identity => {
                    setButtonLoading(false);
                    setButtonDisabled(false);
                    setIdentity(identity);
                    nextStep();
                  })
                  .catch(e => {
                    setButtonLoading(false);
                    setButtonDisabled(false);
                    setError(e);
                  });
              } else {
                setButtonLoading(false);
                setButtonDisabled(false);
                nextStep();
              }
            }}
            icon="mdi/chevron-down"
            red
            disabled={buttonDisabled || buttonLoading}
            loading={buttonLoading}
          >
            {formatMessage({
              id: `onboarding.progress.${
                progress === Object.values(PROGRESS_STATES)[0]
                  ? 'start'
                  : 'next'
              }`,
            })}
          </Button>
        )}
    </div>
  );
};

export default Onboarding;
