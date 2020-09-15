import React from 'react';
import AdminProduct from './AdminProduct.js';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      allProductData: [],
    }
    this.getProductData = this.getProductData.bind(this);
  }

  getProductData() {
    fetch('https://trendycom-pranith-ecommerce.herokuapp.com/product/all')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          allProductData: data,
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getProductData();
  }

  render() {
    const arrayOfProducts = this.state.allProductData.map((product) => {
      return <AdminProduct key={product.id} data={product} getProductData={this.getProductData} />;
    })
    return (
      <div className='admin-controls'>
        <Link to='/admin/add'><div className='add-product-link'>Add Product</div></Link>
        <div>{arrayOfProducts}</div>
      </div>
    );
  }
}

export default Admin;