import React from 'react';

const DocumentType = ({
  className = '',
  nextStep,
  setDocumentType,
}: {
  className?: string;
  nextStep: Function;
  setDocumentType: Function;
}) => (
  <div className={`${className} document-type`}>
    <button
      onClick={() => {
        setDocumentType('paper');
        nextStep();
      }}
    >
      Paper
    </button>
    <button
      onClick={() => {
        setDocumentType('ausweis');
        nextStep();
      }}
    >
      Ausweis
    </button>
  </div>
);

export default DocumentType;
