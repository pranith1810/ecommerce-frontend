import React from 'react';
import Product from './Product.js';
import '../styles/Home.css';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: [{
        id: 1,
        name: 'Shirt',
        topProduct: true,
        price: '₹100',
        image: require('../images/shirt.png')
      },
      {
        id: 2,
        name: 'Pant',
        topProduct: true,
        price: '₹100',
        image: require('../images/jeans.png')
      },
      {
        id: 3,
        name: 'T-shirt',
        topProduct: true,
        price: '₹100',
        image: require('../images/tshirt.jpeg')
      },
      {
        id: 4,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      {
        id: 5,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      {
        id: 6,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      {
        id: 7,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      {
        id: 8,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      {
        id: 9,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      {
        id: 10,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      {
        id: 11,
        name: 'Glasses',
        topProduct: true,
        price: '₹100',
        image: require('../images/glasses.png')
      },
      ]
    }
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