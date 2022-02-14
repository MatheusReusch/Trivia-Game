import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Login from './Login';
import Game from './Game';


export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}
