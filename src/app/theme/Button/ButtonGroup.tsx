import React from 'react';

import './ButtonGroup.css';

const ButtonGroup = ({
  className,
  children,
  ...props
}: {
  className: string;
  children: any;
  [k: string]: any;
}) => (
  <div className={`.button-group ${className}`} {...props}>
    {children}
  </div>
);

export default ButtonGroup;
