import React from 'react';
import '../styles/AdminAdd.css';
import { storage } from '../firebase/config';
import { withRouter } from 'react-router-dom';

class AdminAdd extends React.Component {

  constructor() {
    super();
    this.state = {
      productName: '',
      isTopProduct: 'Yes',
      price: '',
      productType: 'Accessories',
      nameError: '',
      priceError: '',
    }
    this.image = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  validate() {
    const letters = /^[A-Za-z]+$/;
    if (!this.state.productName.match(letters)) {
      this.setState({
        nameError: 'Please enter a valid name',
      })
      return false;
    }
    else {
      this.setState({
        nameError: ''
      })
    }

    if ((parseInt(this.state.price) <= 0)) {
      this.setState({
        priceError: 'Enter a valid price'
      })
      return false;
    }
    else {
      this.setState({
        priceError: ''
      })
    }
    return true;
  }

  handleFormSubmit(event) {
    if (this.validate()) {
      fetch('http://localhost:8080/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            token: localStorage.getItem('token'),
            name: this.state.productName,
            isTopProduct: this.state.isTopProduct,
            price: this.state.price,
            productType: this.state.productType,
            imgPath: this.image.current.files[0].name,
          }),
      })
        .then((response) => {
          if (response.status === 400) {
            this.setState({
              detailsInvalid: 'Please enter correct details!',
            })
          } else {
            return storage.ref(`${this.image.current.files[0].name}`).put(this.image.current.files[0]);
          }
        })
        .then(() => {
          this.setState({
            detailsInvalid: ''
          })
          this.props.history.push('/admin');
        })
        .catch((error) => {
          console.error(error);
        });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className='add-product-container'>
        <form className='add-product-form' onSubmit={this.handleFormSubmit}>
          <div className='admin-add-container'>
            Product Name:
          <input
              className='admin-add-input'
              type='text'
              name='productName'
              value={this.state.email}
              onChange={this.handleChange}
              required={true}
            />
          </div>
          {this.state.nameError !== '' &&
            <div className='error-message'>{this.state.nameError}</div>
          }
          <div className='admin-add-container'>
            Top Product:
          <select className='select-option' name='isTopProduct' value={this.state.isTopProduct} onChange={this.handleChange}>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </div>
          <div className='admin-add-container'>
            Price:
          <input
              className='admin-add-input'
              type='number'
              name='price'
              value={this.state.price}
              onChange={this.handleChange}
              required={true}
            />
          </div>
          {this.state.priceError !== '' &&
            <div className='error-message'>{this.state.priceError}</div>
          }
          <div className='admin-add-container'>
            Type:
            <select className='select-option' name='productType' value={this.state.productType} onChange={this.handleChange}>
              <option value='Accessories'>Accessories</option>
              <option value='Clothing'>Clothing</option>
            </select>
          </div>
          <div className='admin-add-container'>
            Upload Image:
            <input
              className='admin-add-input'
              type="file"
              name="img"
              accept="image/*"
              ref={this.image}
              required={true}
            />
          </div>
          <button type='submit'>Submit</button>
          {
            this.state.detailsInvalid !== '' &&
            <div className='error-message'>{this.state.detailsInvalid}</div>
          }
        </form>
      </div>
    );
  }
}

export default withRouter(AdminAdd);