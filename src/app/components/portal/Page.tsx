import React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '@comp/portal/Page404';

const Page = ({ className = '' }: { className?: string }) => {
  const { page } = useParams();

  switch (page) {
    case 'tickets':
      return <h1>Tickets</h1>;
    case 'notifications':
      return <h1>Notifications</h1>;
    default:
      return <Page404 />;
  }
};

export default Page;
