import React from 'react';
import '../styles/ProductScreen.css';
import { storage } from '../firebase/config';


class ProductScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: '',
      imageUrl: '',
      productInCart: '',
      productInCartError: '',
    }
    this.handleAddCartClick = this.handleAddCartClick.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:8080/product/${this.props.match.params.id}`)
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

  handleAddCartClick() {
    if (this.props.data.loginStatus === null) {
      alert('Please login before adding to cart!');
    }
    else {
      fetch('http://localhost:8080/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            token: localStorage.getItem('token'),
            productId: this.props.match.params.id,
          }),
      })
        .then((response) => {
          if (response.status === 409) {
            this.setState({
              productInCartError: 'Product already added to the cart!',
            })
          } else {
            this.setState({
              productInCart: 'Product added to cart!',
            })
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  render() {
    return (
      <div className='product-screen-container'>
        <img className='product-screen-img' src={this.state.imageUrl} alt='product' />
        <div className='product-screen-description'>
          <h5 className='product-screen-name'>{this.state.productData.name}</h5>
          <p className='product-screen-price'>Price: ₹{this.state.productData.price_rupees}</p>
          <button className='product-screen-addtocart' onClick={this.handleAddCartClick} >Add to Cart</button>
          {this.state.productInCartError !== '' &&
            <div className='error-message'>{this.state.productInCartError}</div>}
          {this.state.productInCart !== '' &&
            <div className='added-message'>{this.state.productInCart}</div>}
        </div>
      </div>
    )
  }
}

export default ProductScreen;

