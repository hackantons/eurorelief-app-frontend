import React from 'react';
import { useIntl } from 'react-intl';
import { Ticket } from '@comp/Portal/Tickets/types';

import './ListItem.css';

const TicketsListItem = ({
  className = '',
  ticket,
}: {
  className?: string;
  ticket: Ticket;
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className={`${className} tickets-list-item`}>
      <p className="tickets-list-item__date">
        {formatMessage({ id: 'notification.date' }, { date: ticket.date })}
      </p>
      <p className="tickets-list-item__text">{ticket.title}</p>
    </div>
  );
};

export default TicketsListItem;
