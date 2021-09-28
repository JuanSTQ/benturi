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
export const setFavoritePreviusly =  (payload)=>{
  return (dispatch)=>{
    if(payload.isExist){
      dispatch(setFavorite(payload.movie))
      return true
    }
    const userMovie = {
      userId: payload.userId,
      movieId: payload.movie._id
    }
      axios({
        url: "/api/usermovies",
        method: "post",
        data: userMovie
      }).then(({data})=>{
        if(data.id){
          const newPayload = {...payload.movie, userMovie: data.id}
          dispatch(setFavorite(newPayload))
        }
      })
      .catch(err=>{
        console.log(err, "ERROR::SETFAV")
      })
  }
}
export const deleteFavoritePreviusly = (payload)=>{

  return (dispatch)=>{
    axios({
      url:`/api/usermovies/${payload.userMovieId}`,
      method: 'delete',
      params: {id: payload.userMovieId}
      
    }).then(({data})=>{
      if(data.id){
        console.log(data.id, "Fav movie Eliminado")
        dispatch(deleteFavorite({_id:payload._id}))
      }
    })
    .catch(error=>{
      console.log(error, "error :: DeletefavPrevios")
    })
  }
}
export const signUp = (payload) => {
  return {
    type: 'CREATE_USER',
    payload,
  };
};
export const signIn = (payload) => {
  return {
    type: 'LOGIN_USER',
    payload,
  };
};
export const signInPreviusly = (payload, redirectUrl)=>{
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
      //history.push('/') No envia las cookies (Solo modifica div[id:app])
      window.location.href = "/" //Permite que el document y cookies se envien junto al request
      dispatch(signIn(data.user))
    })
    .catch(error=>{
      
    })
  }
}
export const signUpPreviusly = (payload, history)=>{
  return (dispatch)=>{
    axios({
      url: "/auth/sign-up",
      method: "post",
      data: payload
    }).then(({data})=>{
      if(data.id){
        history.push('/login');
        delete payload.password 
        dispatch(signUp(payload))
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }
}
export const signOut = (payload) => {
  return {
    type: 'SIGN_OUT',
    payload,
  };
};

export const searchAction = (payload)=>{
  return {
    type: "SEARCH_VIDEO",
    payload
  }
}

export const loadMovies = (payload)=>{
  return {
    type: "LOAD_MOVIE",
    payload
  }
}