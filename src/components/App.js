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

  constructor(){
    super();
    this.state = {
      loginStatus : false
    }
    this.changeLoginStatus = this.changeLoginStatus.bind(this);
  }

  changeLoginStatus(){
    this.setState({
      loginStatus: !this.state.loginStatus
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header data={this.state} changeLoginStatus={this.changeLoginStatus} />
          <Switch>
            <Route path='/login'>
              <Login data={this.state} changeLoginStatus={this.changeLoginStatus} />
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
            <Route path='/product/:id'>
              <AllItemsList />
              <ProductScreen />
            </Route>
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
