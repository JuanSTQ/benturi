import axios from 'axios'

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
const signInPreviusly = (payload, history)=>{
  return (dispatch)=>{
    axios({
      url: "/auth/sign-in",
      method: "post",
      auth: {
        username: payload.email,
        password: payload.password
      }
    }).then(({data})=>{
      //login Succesfully
      document.cookie = `email=${data.user.email}`
      document.cookie = `name=${data.user.name}`
      document.cookie = `id=${data.user.id}`
      dispatch(data.user, history)
    })
    .catch(error=>{
      
    })
  }
}
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
  signInPreviusly
};
