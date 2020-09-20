import React from 'react';
import Product from './Product.js';
import '../styles/Accessories.css';
import {connect} from 'react-redux';
import {accessories} from '../actions/accessoriesAction';

class Accessories extends React.Component {

  componentDidMount() {
    fetch('https://trendycom-pranith-ecommerce.herokuapp.com/product/accessories')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.dispatch(accessories(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const arrayOfProducts = this.props.accessoriesData.map((product) => {
      return <Product key={product.id} data={product} />
    })

    return (
      <div className='accessories-container'>
        <h1>Accessories</h1>
        <div className='top-products'>
          {arrayOfProducts}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessoriesData: state.accessories.accessoriesData,
  };
}

export default connect(mapStateToProps)(Accessories);