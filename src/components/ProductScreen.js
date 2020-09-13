import React from 'react';
import '../styles/ProductScreen.css';
import { storage } from '../firebase/config';


class ProductScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: '',
      imageUrl: '',
    }
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

  render() {
    return (
      <div className='product-screen-container'>
        <img className='product-screen-img' src={this.state.imageUrl} alt='product' />
        <div className='product-screen-description'>
          <h5 className='product-screen-name'>{this.state.productData.name}</h5>
          <p className='product-screen-price'>Price: ₹{this.state.productData.price_rupees}</p>
          <button className='product-screen-addtocart'>Add to Cart</button>
        </div>
      </div>
    )
  }
}

export default ProductScreen;

