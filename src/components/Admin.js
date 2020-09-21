import React from 'react';
import AdminProduct from './AdminProduct.js';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';
import { connect } from 'react-redux';
import { admin } from '../actions/adminAction';

class Admin extends React.Component {

  getProductData() {
    fetch('https://trendycom-pranith-ecommerce.herokuapp.com/product/all')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.dispatch(admin(data));
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