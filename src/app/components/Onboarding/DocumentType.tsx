import React from 'react';
import { Button } from '@app/theme';
import { useIntl } from 'react-intl';

import './DocumentType.css';

const DocumentType = ({
  className = '',
  nextStep,
  setDocumentType,
}: {
  className?: string;
  nextStep: Function;
  setDocumentType: Function;
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${className} document-type`}>
      <p className="document-type__descr">
        {formatMessage({ id: 'onboarding.document.descr' })}
      </p>
      <div className="document-type__element">
        <Button
          className="document-type__button"
          onClick={() => {
            setDocumentType('paper');
            nextStep();
          }}
          red
        >
          {formatMessage({ id: 'onboarding.document.paper' })}
        </Button>
      </div>
      <div className="document-type__element">
        <Button
          className="document-type__button"
          onClick={() => {
            setDocumentType('ausweis');
            nextStep();
          }}
          red
        >
          {formatMessage({ id: 'onboarding.document.ausweis' })}
        </Button>
      </div>
    </div>
  );
};

export default DocumentType;
