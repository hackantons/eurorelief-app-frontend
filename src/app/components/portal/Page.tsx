import React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '@comp/Portal/Page404';
import NotificationsPage from '@comp/Portal/Notifications/Page';
import TicketsPage from '@comp/Portal/Tickets/Page';

import './Page.css';

const Page = ({ className = '' }: { className?: string }) => {
  const { page } = useParams();

  switch (page) {
    case 'tickets':
      return <TicketsPage className="page" />;
    case 'notifications':
      return <NotificationsPage className="page" />;
    default:
      return <Page404 className="page" />;
  }
};

export default Page;
