const initialState = {
  cartData: [],
  cartTotal: 0,
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'CART_DATA':
      return {
        ...state,
        cartData: action.cartData,
      }

    case 'CART_TOTAL':
      return {
        ...state,
        cartTotal: action.cartTotal,
      }

    default:
      return state;
  }
}

export default cartReducer;