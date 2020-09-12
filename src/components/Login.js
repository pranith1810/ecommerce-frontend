import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      userExistError: ''
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
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          email: this.state.email,
          password: this.state.password
        }),
    })
      .then((response) => {
        if (response.status === 400) {
          this.setState({
            emailError: 'Please enter valid email!',
          })
        } else if (response.status === 404) {
          this.setState({
            userExistError: 'Wrong username or password!',
          })
        }
        else {
          this.setState({
            emailError: '',
            userExistError: ''
          })
          this.props.changeLoginStatus();
          this.props.history.push('/home');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className='login-container'>
        {!this.props.data.loginStatus ?
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


export default withRouter(Login);