import React, { useEffect, useState } from 'react';

import './Logo.css';

const Logo = ({ className = '' }: { className?: string }) => {
  const [loadedLogo, setLoadedLogo] = useState('');

  useEffect(() => {
    async function loadIcon() {
      return await import(
        // @ts-ignore
        /* webpackMode: "eager" */ '../../../static/logos/eurorelief-logo.svg'
      );
    }
    loadIcon().then(loaded => setLoadedLogo(loaded.default));
  }, [loadedLogo]);
  return (
    <div
      className={`${className} logo`}
      dangerouslySetInnerHTML={{ __html: loadedLogo }}
    />
  );
};

export default Logo;
