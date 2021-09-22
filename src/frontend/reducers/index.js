const reducer = function (state, action) {
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        myList: state.myList.some(({ id }) => id === action.payload.movie.id)
          ? [...state.myList]
          : [...state.myList, action.payload.movie],
      };
    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter(({ id }) => action.payload.id !== id),
      };
    case 'CREATE_USER':
      return {
        ...state,
        user: { ...state.user, register: action.payload },
      };
    case 'LOGIN_USER':
      if (
        // eslint-disable-next-line operator-linebreak
        state.user.register.email === action.payload.email &&
        state.user.register.password === action.payload.password
      ) {
        action.history.push('/');
        return {
          ...state,
          user: {
            ...state.user,
            login: {
              email: action.payload.email,
              password: action.payload.password,
              name: state.user.register.name,
            },
          },
        };
      }
      window.alert('Login Fail');
      return {
        ...state,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: { login: '', register: '' },
      };
    default:
      return state;
  }
};
export default reducer;
