import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';


class Header extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className='header-container'>
        <Link to='/'>
          <h1 className='store-name'>Trendy.com</h1>
        </Link>
        <div className='header-links'>
          <Link to='/login'><div className='header-login'>Login</div></Link>
          <Link to='/signup'><div className='header-signup'>Sign Up</div></Link>
        </div>
      </div>
    );
  }
}

export default Header;