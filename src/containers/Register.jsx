import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/styles/components/Register.scss';
import Footer from '../components/Footer';

const Register = (props) => {
  return (
    <>
      <Header isRegister="isRegister" />
      <section className="register">
        <section className="register__container">
          <h2>Regístrate</h2>
          <form className="register__container--form">
            <input
              name="name"
              className="input"
              type="text"
              placeholder="Nombre"
            />
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
            />
            <button type="button" className="button">
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
export default Register;
