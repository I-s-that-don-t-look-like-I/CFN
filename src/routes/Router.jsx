import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'src/routes/Home';
import Freeboard from 'src/routes/FreeBoard';
import Landing from './Landing';
import Test from 'src/components/templates/Test';

import Layout from './Layout';
import MyProfile from './MyProfile';
import ProfileList from 'src/components/molecules/ProfileList';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/crowdfunding" element={<Test />} />
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/profile" element={<ProfileList />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/test" element={<Test />} />
        <Route path="/landing" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
