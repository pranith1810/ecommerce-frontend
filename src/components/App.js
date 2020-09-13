import React from 'react';
import Header from './Header.js';
import {
  BrowserRouter as Router, Switch, Route
}
  from 'react-router-dom';
import AllItemsList from './AllItemsList.js';
import Home from './Home.js';
import Clothing from './Clothing.js';
import Accessories from './Accessories.js';
import ProductScreen from './ProductScreen.js';
import SignUp from './SignUp.js';
import Login from './Login.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loginStatus: localStorage.getItem('loginStatus')
    }
    this.changeLogin = this.changeLogin.bind(this);
    this.changeLogout = this.changeLogout.bind(this);
  }

  changeLogin() {
    this.setState({
      loginStatus: true
    })
    localStorage.setItem('loginStatus', true);
  }

  changeLogout() {
    this.setState({
      loginStatus: false
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header data={this.state} changeLogout={this.changeLogout} />
          <Switch>
            <Route path='/login'>
              <Login data={this.state} changeLogin={this.changeLogin} />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path='/clothing'>
              <AllItemsList />
              <Clothing />
            </Route>
            <Route path='/accessories'>
              <AllItemsList />
              <Accessories />
            </Route>
            <Route path='/product/:id' render={props =>
              <div>
                <AllItemsList />
                <ProductScreen {...props} />
              </div>}
            />
            <Route path='/'>
              <AllItemsList />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
