import React from 'react';
import { storage } from '../firebase/config';
import { Link } from 'react-router-dom';
import '../styles/AdminProduct.css';
import axios from 'axios';

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
    axios.delete(`product/delete/${localStorage.getItem('token')}/${this.props.data.id}`)
      .then(() => {
        //Delete from firebase
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
        <div>
          <button onClick={this.handleDeleteClick} className='admin-product-delete'>Delete</button>
          <Link to={`/admin/update/${this.props.data.id}`}><div className='admin-product-update'>Update</div></Link>
        </div>
      </div>
    );
  }
}

export default AdminProduct;