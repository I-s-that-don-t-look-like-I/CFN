import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'src/routes/Home';
import Freeboard from 'src/routes/FreeBoard';
import Landing from './Landing';
import CrowdTest from 'src/components/templates/CrowdTest';

import Layout from './Layout';
import MyProfile from './MyProfile';
import ProfileList from 'src/components/molecules/ProfileList';
import CreateProfile from 'src/components/organisms/CreateProfile';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/crowdfunding" element={<CrowdTest />} />
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/profile" element={<ProfileList />} />
        <Route path="/profile/create" element={<CreateProfile />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/test" element={<CrowdTest />} />
        <Route path="/landing" element={<Landing />} />
        {/* <Route path="/detail" element={<DETAIL />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRouter;
