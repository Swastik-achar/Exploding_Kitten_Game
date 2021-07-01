import React from 'react';
import Home from './Components/Home';
import Game from './Components/Game';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import LeaderBoard from './Components/LeaderBoard';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/play' component={Game}/>
        <Route path='/leaderboard' component={LeaderBoard}/>
        <Redirect from="/" to="/home" /> 
      </Switch>
    </Router>
  );
}
