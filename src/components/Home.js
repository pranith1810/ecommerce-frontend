import React from 'react';
import Product from './Product.js';
import '../styles/Home.css';
import pdata from './pdata';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: pdata
    }
  }

  componentDidMount(){
    
  }

  render() {
    const arrayOfProducts = this.state.productsData.map((product) => {
      if (product.topProduct) {
        return <Product key={product.id} data={product} />
      }
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

export default Home;