import React from 'react';

import './Badge.css';

const Badge = ({
  className = '',
  count,
}: {
  className?: string;
  count: number;
}) => (
  <i className={`badge ${className}`}>
    <span className="badge__text">{count}</span>
  </i>
);

export default Badge;
