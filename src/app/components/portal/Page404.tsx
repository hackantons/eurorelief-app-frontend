import React from 'react';
import { useIntl } from 'react-intl';

const Page404 = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={className}>
      <h1>{formatMessage({ id: '404.title' })}</h1>
      <p>{formatMessage({ id: '404.content' })}</p>
    </div>
  );
};

export default Page404;
