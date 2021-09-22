const obj = {
  isLogin: (h) => {
    h.classList.remove('isRegister');
    h.classList.add('isLogin');
  },
  isRegister: (h) => {
    h.classList.remove('isLogin');
    h.classList.add('isRegister');
  },
  isHome: (h) => {
    h.classList.remove('isLogin');
    h.classList.remove('isRegister');
  },
};
export default obj;
