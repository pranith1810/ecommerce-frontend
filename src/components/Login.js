import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Login.css';
import { connect } from 'react-redux';
import { login } from '../actions/loginAction';
import axios from 'axios';
import jwtDecode from "jwt-decode";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      userExistError: '',
      userConfirmError: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    axios.post('login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        this.setState({
          emailError: '',
          userExistError: '',
          userConfirmError: ''
        })
        return response.data;
      })
      .then((jsonResponse) => {
        localStorage.setItem('token', jsonResponse.token);
        const decoded = jwtDecode(jsonResponse.token);
        this.props.dispatch(login(decoded.isAdmin));
        localStorage.setItem('loginStatus', true);
        if (decoded.isAdmin === 0) {
          localStorage.setItem('adminLogin', false);
        } else {
          localStorage.setItem('adminLogin', true);
        }
        this.props.history.push('/');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            emailError: 'Please enter valid email!',
          })
        } else if (error.response.status === 404) {
          this.setState({
            userExistError: 'Wrong username or password!',
          })
        } else if (error.response.status === 409) {
          this.setState({
            userConfirmError: 'Please confirm your mail',
          })
        }
        console.error(error);
      });
  }

  render() {
    return (
      <div className='login-container'>
        {!this.props.loginStatus ?
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
            {this.state.emailError !== '' &&
              <div className='error-message'>{this.state.emailError}</div>
            }
            {
              this.state.userExistError !== '' &&
              <div className='error-message'>{this.state.userExistError}</div>
            }
            {
              this.state.userConfirmError !== '' &&
              <div className='error-message'>{this.state.userConfirmError}</div>
            }
            <div>
              New user? <Link to='/signup' >Sign Up</Link>
            </div>
            <button type='submit'>Login</button>
          </form>
          :
          <h2>Already Logged in</h2>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.app.loginStatus,
  };
}


export default connect(mapStateToProps)(withRouter(Login));