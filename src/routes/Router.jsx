import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'src/routes/Home';
import Freeboard from 'src/routes/FreeBoard';
import Landing from './Landing';
import NavBar from 'src/components/templates/landing/NavBar';
import Test from 'src/components/templates/Test';
import { useState } from 'react';
import { useEffect } from 'react';
import { authService } from 'src/fbase';
import Layout from './Layout';
import MyProfile from './MyProfile';

function AppRouter() {
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    setUserObj(authService.currentUser);
  }, [userObj]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/crowdfunding" element={<Test />} />
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/test" element={<Test />} />
        <Route path="/landing" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
