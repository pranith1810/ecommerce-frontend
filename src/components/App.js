import React from 'react';
import Header from './Header.js';
import {
  BrowserRouter as Router, Switch, Route
}
  from 'react-router-dom';
import AllItemsList from './AllItemsList.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AllItemsList />
      </div>
    </Router >
  );
}

export default App;
