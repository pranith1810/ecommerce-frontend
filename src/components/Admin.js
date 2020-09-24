import React from 'react';
import AdminProduct from './AdminProduct.js';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';
import { connect } from 'react-redux';
import { admin } from '../actions/adminAction';
import axios from 'axios';

class Admin extends React.Component {

  constructor() {
    super();
    this.getProductData = this.getProductData.bind(this);
  }

  getProductData() {
    axios.get('product/all')
      .then((response) => {
        this.props.dispatch(admin(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getProductData();
  }

  render() {
    const arrayOfProducts = this.props.allProductsData.map((product) => {
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

function mapStateToProps(state) {
  return {
    allProductsData: state.admin.allProductsData,
  };
}

export default connect(mapStateToProps)(Admin);