import React from 'react';
import Product from './Product.js';
import '../styles/Clothing.css';
import { connect } from 'react-redux';
import { clothing } from '../actions/clothingAction.js';

class Clothing extends React.Component {

  componentDidMount() {
    fetch('https://trendycom-pranith-ecommerce.herokuapp.com/product/clothing')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.dispatch(clothing(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const arrayOfProducts = this.props.clothingData.map((product) => {
      return <Product key={product.id} data={product} />
    })

    return (
      <div className='clothing-container'>
        <h1>Clothing</h1>
        <div className='top-products'>
          {arrayOfProducts}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clothingData: state.clothing.clothingData,
  };
}

export default connect(mapStateToProps)(Clothing);