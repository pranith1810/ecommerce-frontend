import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(event){
    console.log('sybmitted');
    event.preventDefault();
  }

  render() {
    return (
      <div className='signup-container'>
        <form className='signup-form' onSubmit={this.handleFormSubmit}>
          <div>
            Name:
          <input className='signup-input' type='text' name='name' value={this.state.name} onChange={this.handleChange} />
          </div>
          <div>
            e-mail:
          <input className='signup-input' type='email' name='email' value={this.state.email} onChange={this.handleChange} />
          </div>
          <div>
            Password:
          <input className='signup-input' type='password' name='password' value={this.state.password} onChange={this.handleChange} />
          </div>
          <div>
            Re-enter password:
          <input className='signup-input' type='password' name='rePassword' value={this.state.rePassword} onChange={this.handleChange} />
          </div>
          <div>
            Already a user? <Link to='/login' >Login</Link>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}


export default SignUp;