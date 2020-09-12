import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Header.css';


class Header extends React.Component {

  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.changeLoginStatus();
    this.props.history.push('/home');
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
            <div>
              <button onClick={this.handleLogoutClick}>Log out</button>
            </div>
        }
      </div>
    );
  }
}

export default withRouter(Header);