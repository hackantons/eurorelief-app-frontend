import React, { useEffect, useState } from 'react';
import { Button } from '@app/theme';

import './A2H.css';

const A2H = ({ className = '' }: { className: string }) => {
  const [prompt, setPrompt] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    if (window.installPrompt) {
      // @ts-ignore
      setPrompt(window.installPrompt);
    }
  }, []);

  if (!prompt) {
    return <React.Fragment />;
  }

  return (
    <Button
      className={`${className} a2h`}
      icon="mdi/download"
      round
      // @ts-ignore
      onClick={() => prompt.prompt()}
    />
  );
};

export default A2H;
