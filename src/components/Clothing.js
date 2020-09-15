import React from 'react';
import Product from './Product.js';
import '../styles/Clothing.css';

class Clothing extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: []
    }
  }

  componentDidMount() {
    fetch('https://trendycom-pranith-ecommerce.herokuapp.com/product/clothing')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          productsData: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const arrayOfProducts = this.state.productsData.map((product) => {
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

export default Clothing;