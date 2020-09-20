const initialState = {
  accessoriesData: [],
}

function accessoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ACCESSORIES':
      return {
        ...state,
        accessoriesData: action.accessoriesData,
      }

    default:
      return state;
  }
}

export default accessoriesReducer;