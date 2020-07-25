import React from 'react';
import cn from 'classnames';

const container = document.getElementById('modals');

import './Modal.css';

const Modal = ({
  title,
  onClose,
  children,
  maxWidth,
}: {
  title: string;
  onClose: Function;
  children: any;
  maxWidth?: number;
}) =>
  React.createPortal(
    <div className="modal">
      <div className="modal__bkg" onClick={() => onClose()} />
      <div className="modal__window" style={maxWidth !== 0 ? { maxWidth } : {}}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button onClick={() => onClose()} className="modal__close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    container
  );

export default Modal;
