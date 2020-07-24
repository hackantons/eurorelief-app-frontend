import React from 'react';
import { useIntl } from 'react-intl';

const Page404 = () => {
  const { formatMessage } = useIntl();
  return (
    <React.Fragment>
      <h1>{formatMessage({ id: '404.title' })}</h1>
      <p>{formatMessage({ id: '404.content' })}</p>
    </React.Fragment>
  );
};

export default Page404;
