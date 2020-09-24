import React from 'react';
import '../styles/ProductScreen.css';
import { storage } from '../firebase/config';
import { connect } from 'react-redux';
import axios from 'axios';


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
    axios.get(`product/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          productData: response.data[0]
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
    if (!this.props.loginStatus) {
      alert('Please login before adding to cart!');
    }
    else {
      axios.post('cart/add', {
        token: localStorage.getItem('token'),
        productId: this.props.match.params.id,
      })
        .then(() => {
          this.setState({
            productInCart: 'Product added to cart!',
          })
        })
        .catch((error) => {
          if (error.response.status === 409) {
            this.setState({
              productInCartError: 'Product already added to the cart!',
              productInCart: '',
            })
          }
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

function mapStateToProps(state) {
  return {
    loginStatus: state.app.loginStatus,
  };
}

export default connect(mapStateToProps)(ProductScreen);

