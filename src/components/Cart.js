import React from 'react';
import CartProduct from './CartProduct.js';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartData: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8080/cart/all/${localStorage.getItem('token')}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          cartData: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const arrayOfProducts = this.state.cartData.map((product) => {
        return <CartProduct key={product.product_id} data={product} />;
    })

    return (
      <div>
        {this.props.data.loginStatus ?
          <div>{ arrayOfProducts }</div>
          :
          <p>Please login for viewing your cart!</p>
        }
      </div>
    );
  }
}

export default Cart;