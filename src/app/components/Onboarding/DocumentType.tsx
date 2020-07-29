import React from 'react';
import { Button } from '@app/theme';
import { useIntl } from 'react-intl';

import './DocumentType.css';
import { DOCUMENT_TYPES } from '@app/vendor/constants';

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
            setDocumentType(DOCUMENT_TYPES.PAPER);
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
            setDocumentType(DOCUMENT_TYPES.AUSWEIS);
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
