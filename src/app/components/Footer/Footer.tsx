import React from 'react';
import LanguageSwitch from '@comp/Footer/LanguageSwitch';

const Footer = ({ className = '' }: { className?: string }) => (
  <div className={`${className} footer`}>
    <LanguageSwitch />
  </div>
);

export default Footer;
