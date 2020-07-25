import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import TicketsListItem from '@comp/Portal/Tickets/ListItem';
import { useApi, states as apiStates } from '@app/hooks/useApi';
import { getTickets } from '@app/vendor/api';
import { Loader, Message } from '@app/theme';

import './List.css';

const TicketsList = ({ className = '' }: { className?: string }) => {
  const tickets = useApi(getTickets);

  const { formatMessage } = useIntl();

  return (
    <div className={`${className} tickets-list`}>
      {tickets.state === apiStates.LOADING && (
        <Loader className="tickets-list__loader" />
      )}
      {tickets.state === apiStates.ERROR && (
        <Message type="error">
          {formatMessage({ id: 'tickets.loadingError' })}
        </Message>
      )}
      {tickets.state === apiStates.SUCCESS &&
        tickets.data.map(ticket => (
          <TicketsListItem className="tickets-list__item" ticket={ticket} />
        ))}
    </div>
  );
};

export default TicketsList;
