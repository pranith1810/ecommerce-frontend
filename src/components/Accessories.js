import React from 'react';
import Product from './Product.js';
import pdata from './pdata';
import '../styles/Accessories.css';

class accessories extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: pdata
    }
  }

  render() {
    const arrayOfProducts = this.state.productsData.map((product) => {
      if (product.type === 'accessories') {
        return <Product key={product.id} data={product} />
      }
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

export default accessories;