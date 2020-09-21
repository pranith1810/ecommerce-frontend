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
import NotFound from './NotFound.js';
import { connect } from 'react-redux';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header changeLogout={this.changeLogout} />
          <Switch>
            <Route path='/login'>
              <Login changeLogin={this.changeLogin} />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route exact path='/admin'>
              <Admin />
            </Route>
            <Route exact path='/admin/add'>
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
                <ProductScreen {...props} />
              </div>}
            />
            <Route exact path='/'>
              <AllItemsList />
              <Home />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router >
    );
  }
}

export default connect()(App);
