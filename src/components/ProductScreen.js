import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductScreen.css';
import pdata from './pdata';


function ProductScreen() {
  let { id } = useParams();
  id = parseInt(id);
  let productDetails;

  for (let i = 0; i < pdata.length; i++) {
    if (pdata[i].id === id) {
      productDetails = pdata[i];
      break;
    }
  }

  return (
    <div className='product-screen-container'>
      <img className='product-screen-img' src={productDetails.image} alt='product' />
      <div className='product-screen-description'>
        <h5 className='product-screen-name'>{productDetails.name}</h5>
        <p className='product-screen-price'>Price: {productDetails.price}</p>
        <button className='product-screen-addtocart'>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductScreen;

