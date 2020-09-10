import React from 'react';

function Product(props) {

  return (
    <div className='product-container'>
      <img className='product-img'  src={props.data.image} alt='product' />
      <h5 className='product-name'>{props.data.name}</h5>   
      <p className='product-price'>{props.data.price}</p>
    </div>
  );
}

export default Product;