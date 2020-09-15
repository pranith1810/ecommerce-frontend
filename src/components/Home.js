import React from 'react';
import Product from './Product.js';
import '../styles/Home.css';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: []
    }
  }

  componentDidMount() {
    fetch('https://trendycom-pranith-ecommerce.herokuapp.com/product/home')
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