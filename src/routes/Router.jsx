import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'src/routes/Home';
import Freeboard from 'src/routes/FreeBoard';
import Landing from './Landing';
import Header from '../components/templates/Header';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';
import { useEffect } from 'react';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => (
  // <Switch>
  //   <Route exact path="/">
  //     <Home />
  //   </Route>
  //   <Route exact path="/NFts">
  //     <NFTs />
  //   </Route>
  //   <Route exact path="/Actors">
  //     <Actors />
  //   </Route>
  //   <Redirect from="*" to="/" />
  // </Switch>
  <Routes>
    {isLoggedIn ? (
      <>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          exact
          path="/freeboard"
          element={
            <>
              <Header />
              <Freeboard />
            </>
          }
        />
        <Route path="/MyProfile" />
      </>
    ) : (
      <>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </>
    )}
  </Routes>
);

export default AppRouter;
