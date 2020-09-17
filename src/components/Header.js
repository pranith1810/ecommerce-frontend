import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Header.css';


class Header extends React.Component {

  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  handleLogoutClick() {
    this.props.changeLogout();
    localStorage.clear();
    this.props.history.push('/');
  }

  handleCartClick() {
    this.props.history.push('/cart');
  }

  render() {
    return (
      <div className='header-container'>
        <Link to='/'>
          <h1 className='store-name'>Trendy.com</h1>
        </Link>
        {
          !this.props.data.loginStatus ?
            <div className='header-links'>
              <Link to='/login'><div className='header-login'>Login</div></Link>
              <Link to='/signup'><div className='header-signup'>Sign Up</div></Link>
            </div>
            :
            <div className='header-links-login'>
              <button className='header-logout' onClick={this.handleLogoutClick}>Log out</button>
              {
                this.props.data.adminLogin === 'true' &&
                <Link to='/admin'><div className='header-admin'>Admin</div></Link>
              }
              {
                this.props.data.adminLogin === 'false' &&
                <img className='header-cart-img' src={require('../images/cart.png')} onClick={this.handleCartClick} alt='cart'></img>
              }
            </div>
        }
      </div>
    );

  }
}

export default withRouter(Header);