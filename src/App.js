import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import List from "./Components/List";
import Home from "./Components/Home";
import React from 'react';

function App() {
  return (
    <Router>
    <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />
          <Route path="/home" component={Home} />
    </Switch>
    </Router>
  );
}

export default App;
