import React from 'react';

import './Logo.css';

const Logo = ({ className = '' }: { className?: string }) => (
  <div className={`${className} logo`}>
    <img src="/assets/static/logos/er-logo-150.png" width={150} height={46} />
  </div>
);

export default Logo;
