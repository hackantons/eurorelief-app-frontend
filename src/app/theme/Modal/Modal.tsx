import React from 'react';

const container = document.getElementById('modals');

import './Modal.css';

const Modal = ({
  className = '',
  title,
  onClose,
  children,
  red = false,
}: {
  className?: string;
  title: string;
  onClose: Function;
  children: any;
  red?: boolean;
}) =>
  React.createPortal(
    <div className={`modal ${red ? 'modal--red' : ''} ${className}`}>
      <button onClick={() => onClose()} className="modal__close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fill="currentColor"
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
      </button>
      <div className="modal__inner">
        <h2 className="modal__title">{title}</h2>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    container
  );

export default Modal;
