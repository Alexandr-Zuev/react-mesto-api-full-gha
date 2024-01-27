import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <div className="header">
      <img className="logo" src={headerLogo} alt="Место" />
    </div>
  );
}

export default Header;
