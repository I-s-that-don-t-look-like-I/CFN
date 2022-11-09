import React from 'react';
import {
  Link,
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import Home from 'src/routes/Home';
import NFTs from 'src/routes/NFTs';
import Actors from 'src/routes/Actors';

const AppRouter = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/NFts">
      <NFTs />
    </Route>
    <Route exact path="/Actors">
      <Actors />
    </Route>
    <Redirect from="*" to="/" />
  </Switch>
);

export default AppRouter;
