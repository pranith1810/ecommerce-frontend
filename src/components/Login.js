import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(event) {
    console.log('submitted');
    event.preventDefault();
  }

  render() {
    return (
      <div className='login-container'>
        <form className='login-form' onSubmit={this.handleFormSubmit}>
          <div>
            e-mail:
          <input
              className='login-input'
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              required={true}
            />
          </div>
          <div>
            Password:
          <input
              className='login-input'
              type='password' 
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              required={true}
            />
          </div>
          <div>
            New user? <Link to='/signup' >Sign Up</Link>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }
}


export default Login;