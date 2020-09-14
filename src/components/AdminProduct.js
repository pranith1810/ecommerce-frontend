import React from 'react';
import { storage } from '../firebase/config';
import '../styles/AdminProduct.css';

class AdminProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

  handleDeleteClick() {
    fetch('http://localhost:8080/product/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          token: localStorage.getItem('token'),
          productId: this.props.data.id,
        }),
    })
      .then(() => {
        const ref = storage.ref().child(`${this.props.data.imgPath}`);
        ref.delete()
          .catch(function (error) {
            console.error(error);
          });
        this.props.getProductData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='admin-product-container'>
        <img className='admin-product-img' src={this.state.imageUrl} alt='product' />
        <div className='admin-product-description'>
          <h5 className='admin-product-name'>{this.props.data.name}</h5>
          <p className='admin-product-price'>Price: ₹{this.props.data.price_rupees}</p>
        </div>
        <button onClick={this.handleDeleteClick} className='admin-product-delete'>Delete</button>
      </div>
    );
  }
}

export default AdminProduct;