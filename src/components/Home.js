import React from 'react';
import Product from './Product.js';
import '../styles/Home.css';
import { connect } from 'react-redux';
import { home } from '../actions/homeAction';
import axios from 'axios';

class Home extends React.Component {

  componentDidMount() {
    axios.get('product/home')
      .then((response) => {
        this.props.dispatch(home(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const arrayOfProducts = this.props.homeProductsData.map((product) => {
      return <Product key={product.id} data={product} />
    })

    return (
      <div className='home-container'>
        <h1>Top Products</h1>
        <div className='top-products'>
          {arrayOfProducts}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    homeProductsData: state.home.homeProductsData,
  };
}

export default connect(mapStateToProps)(Home);