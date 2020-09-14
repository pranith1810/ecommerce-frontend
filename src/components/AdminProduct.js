import React from 'react';
import { storage } from '../firebase/config';
import '../styles/AdminProduct.css';

class AdminProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
    }
  }

  componentDidMount() {
    let storageRef = storage.ref();
    storageRef
      .child(`${this.props.data.imgPath}`)
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageUrl: url,
        })
      })
  }


  render() {
    return (
      <div className='admin-product-container'>
        <img className='admin-product-img' src={this.state.imageUrl} alt='product' />
        <div className='admin-product-description'>
          <h5 className='admin-product-name'>{this.props.data.name}</h5>
          <p className='admin-product-price'>Price: ₹{this.props.data.price_rupees}</p>
        </div>
      </div>
    );
  }
}

export default AdminProduct;