import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userIcon from '../assets/static/user-icon.png';
import '../assets/styles/components/Header.scss';
import obj from '../utils/dinamicComponent';
import benturi from '../assets/static/Benturi.svg';
import gravatar from '../utils/gravatar';
import { signOut } from '../actions';

const Header = ({ isLogin, isRegister, isHome, user, signOut }) => {
  useEffect(() => {
    const h = document.querySelector('.header');
    obj[isLogin || isRegister || isHome](h);
  }, []);
  const handleOnClick = (e) => {
    signOut({});
    document.cookie = "email="
    document.cookie = "name="
    document.cookie = "id="
    document.cookie = "token="
    window.location.href = '/login'
  };

  return (
    <>
      <header className="header">
        <Link to="/">
          <img className="header__img" src={benturi} alt="Benturi-Logo" />
        </Link>
        <div className="header__menu">
          <div className="header__menu--profile">
            <img
              id="user-icon"
              src={user.email ? gravatar(user.email) : userIcon}
              alt="Usuario"
            />
            <p>Perfil</p>
          </div>
          <ul>
            <li>
              {user.name ? (
                <Link to="/">{user.name}</Link>
              ) : (
                <Link to="/login">Sign in</Link>
              )}
            </li>
            <li>
              {user ? (
                <Link to="/" onClick={handleOnClick}>
                  Sign out
                </Link>
              ) : (
                <Link to="/register">Sign up</Link>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};
export default connect((state) => ({ user: state.user }), { signOut })(
  Header
);
