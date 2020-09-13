import React from 'react';
import Product from './Product.js';
import '../styles/Accessories.css';

class accessories extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/product/accessories')
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