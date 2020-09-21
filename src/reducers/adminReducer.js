const initialState = {
  allProductsData: [],
}

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADMIN_ALL_PRODUCTS':
      return {
        ...state,
        allProductsData: action.allProductsData,
      }

    default:
      return state;
  }
}

export default adminReducer;;