import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Login from './Login';
import Game from './Game';
import Feedback from './Feedback';
import Ranking from './Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
