const reducer = function (state, action) {
  switch (action.type) {
    case 'SET_FAVORITE':
      console.log(state.myList)
      return {
        ...state,
        myList: state.myList.some(({ _id }) => _id === action.payload._id)
          ? [...state.myList]
          : [...state.myList, action.payload],
      };
    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter(({ _id }) => action.payload._id !== _id),
      };
    case 'CREATE_USER':
      return {
        ...state,
        user: { ...state.user, register: action.payload },
      };
    case 'LOGIN_USER':
    case 'SING_UP':
    case 'SIGN_OUT':
      return {
        ...state,
        user: {},
      };
    case "SEARCH_VIDEO":
      return {
        ...state,
        searchTrends: state.trends.filter(({title})=>{
          const searchValue = action.payload.value.toLowerCase();
          return title.toLowerCase().includes(searchValue)
        }),
        searchOriginals: state.originals.filter(({title})=>{
          const searchValue = action.payload.value.toLowerCase()
          return title.toLowerCase().includes(searchValue)
        })
      };
    case "LOAD_MOVIE":
      return {
        ...state,
        searchOriginals: state.originals,
        searchTrends: state.trends,
      };
    default:
      return state;
  }
};
export default reducer