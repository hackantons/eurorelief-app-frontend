import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Ticket } from '@comp/Portal/Tickets/types';

//import qrcode from 'qrcode-generator';
import QRCode from 'qrcode.react';

import './ListItem.css';

const TicketsListItem = ({
  className = '',
  ticket,
}: {
  className?: string;
  ticket: Ticket;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { formatMessage } = useIntl();
  const ref = useRef(null);

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`${className} tickets-list-item`}
      ref={ref}
    >
      {open && (
        <QRCode
          value={JSON.stringify(ticket)}
          size={ref ? ref.current.clientWidth : 200}
          className="tickets-list-item__code"
          level="M"
          renderAs="svg"
        />
      )}
      <p className="tickets-list-item__date">
        {formatMessage({ id: 'notification.date' }, { date: ticket.date })}
      </p>
      <p className="tickets-list-item__text">{ticket.title}</p>
    </button>
  );
};

export default TicketsListItem;
