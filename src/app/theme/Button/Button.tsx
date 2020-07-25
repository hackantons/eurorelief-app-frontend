import React from 'react';
import { VNode } from 'preact';
import cn from 'classnames';

import { Icon, Loader } from '@app/theme';

import './Button.css';

const Button = ({
  className = '',
  children,
  onClick,
  round = false,
  white = false,
  loading = false,
  ui = 'normal',
  icon,
  ...props
}: {
  className?: string;
  children?: VNode | VNode[] | string;
  onClick?: Function;
  round?: boolean;
  white?: boolean;
  icon?: string;
  loading?: boolean;
  ui?: 'normal' | 'none';
  [x: string]: any;
}) => {
  return (
    <button
      className={cn(className, 'button', 'button--type-' + ui, {
        'button--icon': icon,
        'button--round': round,
        'button--has-text': children,
        'button--bkg-white': white,
        'button--loading': loading,
      })}
      onClick={onClick ? () => onClick() : null}
      {...props}
    >
      {icon && <Icon icon={icon} className="button__icon" />}
      {children && <span className="button__text">{children}</span>}
      <Loader className="button__loader" />
    </button>
  );
};

export default Button;
