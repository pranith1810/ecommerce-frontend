
const initialState = {
  loginStatus: localStorage.getItem('loginStatus'),
  adminLogin: localStorage.getItem('adminLogin'),
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loginStatus: true,
        adminLogin: action.isAdmin === 0 ? 'false' : 'true',
      }

    case 'LOGOUT':
      return {
        ...state,
        loginStatus: false,
        adminLogin: false,
      }

    default:
      return state;
  }
}

export default appReducer;