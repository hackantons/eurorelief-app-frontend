import React from 'react';
import { VNode } from 'preact';
import cn from '@app/utils/classnames';

import { Icon, Loader } from '@app/theme';

import './Button.css';

const Button = ({
  className = '',
  children = null,
  onClick,
  round = false,
  red = false,
  loading = false,
  small = false,
  ui = 'normal',
  icon = '',
  ...props
}: {
  className?: string;
  children?: VNode | VNode[] | string;
  onClick?: Function;
  round?: boolean;
  red?: boolean;
  icon?: string;
  loading?: boolean;
  small?: boolean;
  ui?: 'normal' | 'none';
  [x: string]: any;
}) => {
  return (
    <button
      className={
        `${className} button button--type-${ui}` +
        cn({
          'button--icon': icon !== '',
          'button--round': round,
          'button--has-text': children !== null,
          'button--bkg-red': red,
          'button--loading': loading,
          'button--size-small': small,
        })
      }
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
