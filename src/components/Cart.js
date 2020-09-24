import React from 'react';
import CartProduct from './CartProduct.js';
import '../styles/Cart.css';
import { connect } from 'react-redux';
import { cartProducts } from '../actions/cartProductsAction';
import { cartTotal } from '../actions/cartTotalAction';
import axios from 'axios';

class Cart extends React.Component {

  constructor(){
    super();
    this.getCartData = this.getCartData.bind(this);
  }

  getCartData() {
    axios.get(`cart/all/${localStorage.getItem('token')}`)
      .then((response) => {
        this.props.dispatch(cartProducts(response.data));
        return response.data;
      })
      .then((data) => {
        let cartTotalPrice = 0;
        data.forEach((product) => {
          cartTotalPrice = cartTotalPrice + product.price_rupees * product.quantity;
        });
        this.props.dispatch(cartTotal(cartTotalPrice));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getCartData();
  }

  render() {
    const arrayOfProducts = this.props.cartData.map((product) => {
      return <CartProduct key={product.product_id} data={product} getCartData={this.getCartData} />;
    })

    return (
      <div>
        {this.props.loginStatus ?
          <div>
            <div>{arrayOfProducts}</div>
            <p className='cart-total'>Cart Total: ₹{this.props.cartTotal} </p>
          </div>
          :
          <p>Please login for viewing your cart!</p>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    cartTotal: state.cart.cartTotal,
    loginStatus: state.app.loginStatus,
  };
}

export default connect(mapStateToProps)(Cart);