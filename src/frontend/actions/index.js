import axios from 'axios'

export const setFavorite = (payload) => {
  return {
    type: 'SET_FAVORITE',
    payload,
  };
};
export const deleteFavorite = (payload) => {
  return {
    type: 'DELETE_FAVORITE',
    payload,
  };
};
export const signUp = (payload) => {
  return {
    type: 'CREATE_USER',
    payload,
  };
};
export const signIn = (payload, history) => {
  return {
    type: 'LOGIN_USER',
    payload,
    history,
  };
};
export const signInPreviusly = (payload, history)=>{
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
      history.push('/')
      dispatch(signIn(data.user, history))
    })
    .catch(error=>{
      
    })
  }
}
export const signOut = (payload) => {
  return {
    type: 'SIGN_OUT',
    payload,
  };
};

