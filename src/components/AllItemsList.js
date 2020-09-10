import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AllItemsList.css';

function AllItemsList() {
  return (
    <div>
      <ul className='all-items'>
        <li className='item'>
          <Link to='/'>Home</Link>
        </li>
        <li className='item'>
          <Link to='/clothing'>Clothing</Link>
        </li>
        <li className='item'>
          <Link to='/accessories'>Accessories</Link>
        </li>
        <li className='item'>
          <Link to='/electronics'>Electronics</Link>
        </li>
        <li className='item'>
          <Link to='/books'>Books</Link>
        </li>
      </ul>
    </div>
  );
}

export default AllItemsList;