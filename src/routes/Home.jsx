import CallToActionWithVideo from 'src/components/Main.jsx';
import React from 'react';
import Header from 'src/components/Header.jsx';
import SidebarWithHeader from 'src/components/Sidebar.jsx';
import TopBanner from 'src/components/TopBanner.jsx';
import Events from 'src/components/Events.jsx';
import Profiles from 'src/components/Profiles.jsx';

const Home = () => (
  <>
    <Header />
    <TopBanner />
    <Events />
    <Profiles />
  </>
);

export default Home;
