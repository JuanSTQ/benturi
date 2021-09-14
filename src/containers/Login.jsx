import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/styles/components/Login.scss';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
import Footer from '../components/Footer';

const Login = (props) => {
  const handleInput = (event) => {};

  const handleSubmit = (event) => {};

  return (
    <>
      <Header isLogin="isLogin" />
      <section className="login">
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
              onChange={handleInput}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={handleInput}
            />
            <button className="button" type="button">
              Iniciar sesión
            </button>
            <div className="login__container--remember-me">
              <label htmlFor="cbox1">
                <input type="checkbox" id="cbox1" value="first_checkbox" />{' '}
                Recuérdame
              </label>
              <a href="/">Olvidé mi contraseña</a>
            </div>
          </form>
          <section className="login__container--social-media">
            <div>
              <img src={googleIcon} alt="Google icon" /> Inicia sesión con
              Google
            </div>
            <div>
              <img src={twitterIcon} alt="Twitter Icon" /> Inicia sesión con
              Twitter
            </div>
          </section>
          <p className="login__container--register">
            No tienes ninguna cuenta <Link to="/register">Regístrate</Link>
          </p>
        </section>
      </section>
      <Footer isLogin="isLogin" />
    </>
  );
};
export default Login;
