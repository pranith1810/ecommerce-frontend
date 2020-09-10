import React from 'react';
import {Link} from 'react-router-dom';

function Product(props) {

  return (
    <div className='product-container'>
      <Link to={`/product/${props.data.id}`} >
        <img className='product-img' src={props.data.image} alt='product' />
        <h5 className='product-name'>{props.data.name}</h5>
      </Link>
      <p className='product-price'>{props.data.price}</p>
    </div>
  );
}

export default Product;