import React from 'react';
import { useIntl } from 'react-intl';

import TicketsList from '@comp/Portal/Tickets/List';

const TicketsPage = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={`${className} tickets-page`}>
      <h1>{formatMessage({ id: 'navigation.tickets' })}</h1>
      <TicketsList className="tickets-page__list" />
    </div>
  );
};

export default TicketsPage;
