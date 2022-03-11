import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import './App.css';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route
        path="/settings"
        component={ Settings }
      />
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        path="/game"
        component={ Game }
      />
      <Route
        path="/feedback"
        component={ Feedback }
      />
    </Switch>);
}
