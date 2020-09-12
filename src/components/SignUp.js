import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/SignUp.css';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      nameError: '',
      passwordError: '',
      userExistError: '',
      detailsInvalid: ''
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

  validate() {
    const letters = /^[A-Za-z]+$/;
    if (!this.state.name.match(letters)) {
      this.setState({
        nameError: 'Please enter a valid name',
        passwordError: ''
      })
      return false;
    }
    else {
      this.setState({
        nameError: ''
      })
    }

    if (!(this.state.password.length >= 8)) {
      this.setState({
        passwordError: 'Minimum of 8 characters'
      })
      return false;
    }
    else {
      this.setState({
        passwordError: ''
      })
    }
    return true;
  }

  handleFormSubmit(event) {
    if (this.validate()) {
      fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          }),
      })
        .then((response) => {
          if (response.status === 400) {
            this.setState({
              detailsInvalid: 'Please enter correct details!',
              userExistError: ''
            })
          } else if (response.status === 409) {
            this.setState({
              userExistError: 'User already exists!',
              detailsInvalid: ''
            })
          }
          else {
            this.setState({
              userExistError: '',
              detailsInvalid: ''
            })
            alert('Please confirm your email and login!');
            this.props.history.push('/login');
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className='signup-container'>
        <form className='signup-form' onSubmit={this.handleFormSubmit}>
          <div className='input-container'>
            Name:
          <input
              className='signup-input'
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              required={true}
            />
          </div>
          {this.state.nameError !== '' &&
            <div className='error-message'>{this.state.nameError}</div>
          }
          <div className='input-container'>
            e-mail:
          <input
              className='signup-input'
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              required={true}
            />
          </div>
          <div className='input-container'>
            Password:
          <input
              className='signup-input'
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              required={true}
            />
          </div>
          {this.state.passwordError !== '' &&
            <div className='error-message'>{this.state.passwordError}</div>
          }
          {
            this.state.userExistError !== '' &&
            <div className='error-message'>{this.state.userExistError}</div>
          }
          {
            this.state.detailsInvalid !== '' &&
            <div className='error-message'>{this.state.detailsInvalid}</div>
          }
          <div className='login-link'>
            Already a user? <Link to='/login' >Login</Link>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    );
  }
}


export default withRouter(SignUp);