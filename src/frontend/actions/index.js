const setFavorite = (payload) => {
  return {
    type: 'SET_FAVORITE',
    payload,
  };
};
const deleteFavorite = (payload) => {
  return {
    type: 'DELETE_FAVORITE',
    payload,
  };
};
const signUp = (payload) => {
  return {
    type: 'CREATE_USER',
    payload,
  };
};
const signIn = (payload, history) => {
  return {
    type: 'LOGIN_USER',
    payload,
    history,
  };
};
const signOut = (payload) => {
  return {
    type: 'SIGN_OUT',
    payload,
  };
};
module.exports = {
  setFavorite,
  deleteFavorite,
  signUp,
  signIn,
  signOut,
};
