import React from 'react';
import { storage } from '../firebase/config';
import '../styles/CartProduct.css';

class CartProduct extends React.Component {
  constructor(){
    super()
    this.state ={
      productData: '',
      imageUrl: '',
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8080/product/${this.props.data.product_id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          productData: data[0]
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

  render(){
    return (
      <div className='cart-product-container'>
        <img className='cart-product-img' src={this.state.imageUrl} alt='product' />
        <div className='cart-product-description'>
          <h5 className='cart-product-name'>{this.state.productData.name}</h5>
          <p className='cart-product-price'>Price: ₹{this.state.productData.price_rupees}</p>
        </div>
      </div>
    );
  }
}

export default CartProduct;