import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Settings from './Pages/Settings';

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
    </Switch>);
}
