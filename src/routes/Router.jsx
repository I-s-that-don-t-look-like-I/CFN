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
import CrowdFunding from './CrowdFunding';
import Solidity from './CrowdfundDetail';
import MakeCrowdfund from './MakeCrowdfund';
import AccountSetting from './AccountSetting';
import MyCrowdfund from './MyCrowdfund';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/crowdfunding" element={<CrowdFunding />} />
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/profile" element={<ProfileList />} />
        <Route path="/profile/create" element={<CreateProfile />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/test" element={<CrowdTest />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/detail" element={<Solidity />} />
        <Route path="/makeCrowdfund" element={<MakeCrowdfund />} />
        <Route path="/account" element={<AccountSetting />} />
        <Route path="/mycrowdfund" element={<MyCrowdfund />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
