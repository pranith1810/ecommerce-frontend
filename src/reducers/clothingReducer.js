const initialState = {
  clothingData: [],
}

function clothingReducer(state = initialState, action) {
  switch (action.type) {
    case 'CLOTHING':
      return {
        ...state,
        clothingData: action.clothingData,
      }

    default:
      return state;
  }
}

export default clothingReducer;