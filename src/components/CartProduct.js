import axios from 'axios';
import React from 'react';
import { storage } from '../firebase/config';
import '../styles/CartProduct.css';

class CartProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      productData: '',
      imageUrl: '',
      productQuantity: 0,
    }
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    axios.get(`product/${this.props.data.product_id}`)
      .then((response) => {
        this.setState({
          productData: response.data[0],
          productQuantity: this.props.data.quantity,
          productQuantityError: '',
        })
      })
      .then(() => {
        let storageRef = storage.ref();
        storageRef
          .child(`${this.state.productData.imgPath}`)
          .getDownloadURL()
          .then(url => {
            this.setState({
              imageUrl: url,
            })
          })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handlePlusClick() {
    axios.put('cart/update/add', {
      token: localStorage.getItem('token'),
      productId: this.props.data.product_id,
    })
      .then(() => {
        this.props.getCartData();
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({
      productQuantity: this.state.productQuantity + 1,
      productQuantityError: '',
    })
  }

  handleMinusClick() {
    if (this.state.productQuantity === 1) {
      this.setState({
        productQuantityError: 'Quantity cannot be 0',
      });
    }
    else {
      axios.put('cart/update/minus', {
        token: localStorage.getItem('token'),
        productId: this.props.data.product_id,
      })
        .then(() => {
          this.props.getCartData();
        })
        .catch((error) => {
          console.error(error);
        });

      this.setState({
        productQuantity: this.state.productQuantity - 1,
      })
    }
  }

  handleDeleteClick() {
    axios.delete(`cart/delete/${localStorage.getItem('token')}/${this.props.data.product_id}`)
      .then(() => {
        this.props.getCartData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='cart-product-container'>
        <img className='cart-product-img' src={this.state.imageUrl} alt='product' />
        <div className='cart-product-description'>
          <h5 className='cart-product-name'>{this.state.productData.name}</h5>
          <p className='cart-product-price'>Price: ₹{this.state.productData.price_rupees}</p>
          {this.state.productQuantityError !== '' &&
            <div className='quantity-error-message'>{this.state.productQuantityError}</div>}
        </div>
        <p className='cart-quantity'>Quantity: {this.state.productQuantity}</p>
        <p className='total-price-product'>Total Price: ₹{this.state.productData.price_rupees * this.state.productQuantity}</p>
        <div className='cart-quantity-buttons'>
          <button onClick={this.handlePlusClick} className='plus'>+</button>
          <button onClick={this.handleMinusClick} className='minus'>-</button>
          <button onClick={this.handleDeleteClick} className='delete'>Delete</button>
        </div>
      </div>
    );
  }
}

export default CartProduct;