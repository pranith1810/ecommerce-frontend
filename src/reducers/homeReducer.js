const initialState = {
  homeProductsData: [],
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'HOME':
      return {
        ...state,
        homeProductsData: action.homeProductsData,
      }

    default:
      return state;
  }
}

export default homeReducer;