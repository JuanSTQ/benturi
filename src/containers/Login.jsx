import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../assets/styles/components/Login.scss';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
import Footer from '../components/Footer';
import { signIn } from '../actions';

const Login = ({ signIn, history, user }) => {
  const [form, setform] = useState({ email: '', password: '' });
  const handleInput = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(form, history);
  };

  return (
    <>
      <Header isLogin="isLogin" />
      <section className="login">
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input
              required={true}
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
              onChange={handleInput}
            />
            <input
              required={true}
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={handleInput}
            />
            <button className="button" type="submit">
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

export default connect((state) => ({ user: state.user.login }), { signIn })(
  Login
);
