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
import Cart from './Cart.js';
import Admin from './Admin.js';
import AdminAdd from './AdminAdd.js';
import AdminUpdate from './AdminUpdate.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loginStatus: localStorage.getItem('loginStatus'),
      adminLogin: localStorage.getItem('adminLogin'),
    }
    this.changeLogin = this.changeLogin.bind(this);
    this.changeLogout = this.changeLogout.bind(this);
  }

  changeLogin(isAdmin) {
    this.setState({
      loginStatus: true,
      adminLogin: isAdmin === 0 ? 'false' : 'true',
    })
    localStorage.setItem('loginStatus', true);
    if (isAdmin === 0) {
      localStorage.setItem('adminLogin', false);
    } else {
      localStorage.setItem('adminLogin', true);
    }
  }

  changeLogout() {
    this.setState({
      loginStatus: false,
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
            <Route path='/cart'>
              <Cart data={this.state} />
            </Route>
            <Route exact path='/admin'>
              <Admin />
            </Route>
            <Route path='/admin/add'>
              <AdminAdd />
            </Route>
            <Route exact path='/admin/update/:id' render={props =>
              <div>
                <AdminUpdate {...props} />
              </div>}
            />
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
            <Route exact path='/product/:id' render={props =>
              <div>
                <AllItemsList />
                <ProductScreen {...props} data={this.state} />
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
