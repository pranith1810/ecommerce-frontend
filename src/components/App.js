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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AllItemsList />
        <Switch>
          <Route path='/clothing'>
            <Clothing />
          </Route>
          <Route path='/accessories'>
            <Accessories />
          </Route>

          <Route path='/product/:id'>
            <ProductScreen />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
