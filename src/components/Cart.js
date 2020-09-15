import React from 'react';
import CartProduct from './CartProduct.js';
import '../styles/Cart.css';

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
    fetch(`https://trendycom-pranith-ecommerce.herokuapp.com/cart/all/${localStorage.getItem('token')}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          cartData: data,
        })
        return data;
      })
      .then((data)=>{
        let cartTotal = 0;
        data.forEach((product) => {
          cartTotal = cartTotal + product.price_rupees*product.quantity;
        });
        this.setState({
          cartTotal
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
            <p className='cart-total'>Cart Total: ₹{this.state.cartTotal} </p>
          </div>
          :
          <p>Please login for viewing your cart!</p>
        }
      </div>
    );
  }
}

export default Cart;