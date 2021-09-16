import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Register.scss';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signUp } from '../actions';

const Register = ({ signUp, history }) => {
  const [form, setform] = useState({ email: '', password: '', name: '' });
  const handleOnChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = (e) => {
    /* Implementar la validacion de formularios */
    e.preventDefault();
    signUp(form);
    history.push('/login');
  };
  return (
    <>
      <Header isRegister="isRegister" />
      <section className="register">
        <section className="register__container">
          <h2>Regístrate</h2>
          <form className="register__container--form" onSubmit={handleOnSubmit}>
            <input
              required={true}
              name="name"
              className="input"
              type="text"
              placeholder="Nombre"
              onChange={handleOnChange}
            />
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
              onChange={handleOnChange}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={handleOnChange}
            />
            <button type="submit" className="button">
              Registrarme
            </button>
          </form>
          <Link to="/login">Iniciar sesión</Link>
        </section>
      </section>
      <Footer isRegister="isRegister" />
    </>
  );
};

export default connect(null, { signUp })(Register);
