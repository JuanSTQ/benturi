import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import user from '../assets/static/user-icon.png';
import '../assets/styles/components/Header.scss';
import obj from '../utils/dinamicComponent';

const Header = ({ isLogin, isRegister, isHome }) => {
  useEffect(() => {
    const h = document.querySelector('.header');
    obj[isLogin || isRegister || isHome](h);
  }, []);
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
              <Link to="/login">Cuenta</Link>
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
