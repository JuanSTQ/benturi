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
    case 'SIGN_OUT':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
export default reducer