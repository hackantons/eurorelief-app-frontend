import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './Logo.css';

interface Props {
  logo: string;
  className?: string;
}

const Logo = ({ logo, className = '' }: Props) => {
  const [loadedLogo, setLoadedLogo] = useState('');

  useEffect(() => {
    async function loadLogo() {
      return await import(
        /* webpackMode: "eager" */ `../../../static/logos/${logo}.png` // to do: change to vector
      );
    }
    loadLogo().then(loaded => setLoadedLogo(loaded.default));
  }, [logo]);

  return (
    <div className={`${className} logo`}>
      <img src={loadedLogo} />
    </div>
  );
};

export default Logo;
