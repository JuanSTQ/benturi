import React from 'react';
import user from '../assets/static/user-icon.png';
import '../assets/styles/components/Header.scss';

const Header = () => {
  return (
    <>
      <header className="header">
        <img className="header__img" src="" alt="Benturi-Logo" />
        <div className="header__menu">
          <div className="header__menu--profile">
            <img src={user} alt="Usuario" />
            <p>Perfil</p>
          </div>
          <ul>
            <li>
              <a href="/">Cuenta</a>
            </li>
            <li>
              <a href="/">Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
