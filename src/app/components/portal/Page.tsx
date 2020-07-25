import React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '@comp/Portal/Page404';
import NotificationsPage from '@comp/Portal/Notifications/Page';

const Page = ({ className = '' }: { className?: string }) => {
  const { page } = useParams();

  switch (page) {
    case 'tickets':
      return <h1>Tickets</h1>;
    case 'notifications':
      return <NotificationsPage />;
    default:
      return <Page404 />;
  }
};

export default Page;
