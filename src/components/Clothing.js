import React from 'react';
import Product from './Product.js';
import pdata from './pdata';
import '../styles/Clothing.css';

class Clothing extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: pdata
    }
  }

  render() {
    const arrayOfProducts = this.state.productsData.map((product) => {
      if (product.type === 'clothing') {
        return <Product key={product.id} data={product} />
      }
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

export default Clothing;