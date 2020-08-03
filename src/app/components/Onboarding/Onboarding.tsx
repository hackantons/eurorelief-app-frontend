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

import './Onboarding.css';
import { settingsDB } from '@app/store/idb';
import {
  createAccount,
  fetchUser,
  resolveCampID,
} from '@app/authentication/network';
import { Promise } from 'es6-promise';
import { doSignIn } from '@app/authentication/actions';
import { getUser } from '@app/vendor/api';

const Onboarding = ({ className = '' }: { className?: string }) => {
  const [progress, setProgress] = React.useState<number>(0);
  const [documentType, setDocumentType] = React.useState<string>(null);
  const [id, setId] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);
  const [error, setError] = React.useState<string>('');

  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
  const [identity, setIdentity] = React.useState<Identity>(null);
  const { formatMessage } = useIntl();
  const { setIdentity: setStoreIdentity } = useActions(actions);

  const nextStep = () => setProgress(progress + 1);

  const signUp = id =>
    new Promise((resolve, reject) =>
      resolveCampID(id)
        .then(uuid => {
          createAccount(uuid)
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
            .catch(() => reject(formatMessage({ id: 'general.error' })));
        })
        .catch(() => reject(formatMessage({ id: 'onboarding.number.invalid' })))
    );

  return (
    <div className={`${className} onboarding`}>
      {progress === 0 && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.welcome' })}</h1>
          <ChooseLanguage className="onboarding__content" />
        </React.Fragment>
      )}
      {progress === 1 && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.welcome' })}</h1>
          <DocumentType
            nextStep={nextStep}
            setDocumentType={setDocumentType}
            className="onboarding__content"
          />
        </React.Fragment>
      )}
      {progress === 2 && (
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
      {progress === 3 && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.papers' })}</h1>
          <ChoosePhone
            className="onboarding__content"
            setIdentity={setIdentity}
            id={id}
          />
        </React.Fragment>
      )}
      {progress === 4 && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.papers' })}</h1>
          <Install className="onboarding__content" nextStep={nextStep} />
        </React.Fragment>
      )}
      {progress === 5 && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.papers' })}</h1>
          <PushNotifications
            className="onboarding__content"
            nextStep={nextStep}
          />
        </React.Fragment>
      )}
      {progress === 6 && (
        <React.Fragment>
          <h1>{formatMessage({ id: 'onboarding.title.papers' })}</h1>
          <p>done</p>
        </React.Fragment>
      )}
      {progress !== 1 && (
        <Button
          className="onboarding__progress"
          onClick={() => {
            setError('');
            setButtonLoading(true);
            setButtonDisabled(true);
            if (progress === 2) {
              signUp(id)
                .then(() => {
                  setButtonLoading(false);
                  setButtonDisabled(false);
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
              progress === 0 ? 'start' : progress === 4 ? 'done' : 'next'
            }`,
          })}
        </Button>
      )}
    </div>
  );
};

export default Onboarding;
