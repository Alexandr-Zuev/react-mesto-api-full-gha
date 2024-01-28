import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ mail }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [headerNav, setHeaderNav] = useState('');

  useEffect(() => {
    switch (location.pathname) {
      case '/main':
        setHeaderNav(
          <div className="header__group">
            <p className="header__email">{mail}</p>
            <button onClick={signOut} className="header__text">
              Выйти
            </button>
          </div>
        );
        break;
      case '/sign-in':
        setHeaderNav(
          <Link to="/sign-up" className="header__text">
            Регистрация
          </Link>
        );
        break;
      case '/sign-up':
        setHeaderNav(
          <Link to="/sign-in" className="header__text">
            {' '}
            Войти
          </Link>
        );
        break;
      default:
        setHeaderNav('');
        break;
    }
  }, [location.pathname]);

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (
    <div className="header">
      <img className="logo" src={headerLogo} alt="Место" />
      {headerNav}
    </div>
  );
}

export default Header;
