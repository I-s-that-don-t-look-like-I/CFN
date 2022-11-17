import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'src/routes/Home';
import Freeboard from 'src/routes/FreeBoard';
import Landing from './Landing';
import NavBar from 'src/components/templates/landing/NavBar';
import { useGoogleAuth } from 'src/hooks/useGoogleAuth';
import { useEffect } from 'react';
import Test from 'src/components/templates/Test';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => (
  <Routes>
    {isLoggedIn ? (
      <>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        />
        <Route
          exact
          path="/freeboard"
          element={
            <>
              <NavBar />
              <Freeboard />
            </>
          }
        />
        <Route path="/MyProfile" />
        <Route path="/test" element={<Test />} />
      </>
    ) : (
      <>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        />
      </>
    )}
  </Routes>
);

export default AppRouter;
