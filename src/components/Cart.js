import React from 'react';
import CartProduct from './CartProduct.js';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      cartTotal: 0,
    };
    this.getCartData = this.getCartData.bind(this);
  }

  getCartData() {
    fetch(`http://localhost:8080/cart/all/${localStorage.getItem('token')}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          cartData: data,
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getCartData();
  }

  render() {
    const arrayOfProducts = this.state.cartData.map((product) => {
      return <CartProduct key={product.product_id} data={product} getCartData={this.getCartData} />;
    })

    return (
      <div>
        {this.props.data.loginStatus ?
          <div>
            <div>{arrayOfProducts}</div>
            <p>Cart Total:{this.state.cartTotal} </p>
          </div>
          :
          <p>Please login for viewing your cart!</p>
        }
      </div>
    );
  }
}

export default Cart;