import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Footer.scss';
import obj from '../utils/dinamicComponent';

const Footer = ({ isLogin, isRegister, isHome }) => {
  useEffect(() => {
    const h = document.querySelector('.footer');
    obj[isLogin || isRegister || isHome](h);
  }, []);
  return (
    <footer className="footer">
      <Link to="/">Terminos de uso</Link>
      <Link to="/">Declaración de privacidad</Link>
      <Link to="/">Centro de ayuda</Link>
    </footer>
  );
};
export default Footer;
