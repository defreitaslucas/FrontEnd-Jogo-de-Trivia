import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      {/* <Route
        path="/carteira"
        component={ Wallet }
      /> */}
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        path="/game"
        component={ Game }
      />
    </Switch>);
}
