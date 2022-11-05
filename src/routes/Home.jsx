import React from 'react';
import SidebarWithHeader from 'src/components/templates/SidebarWithHeader';
import TopBanner from 'src/components/templates/TopBanner';
import Events from 'src/components/templates/Events';
import Profiles from 'src/components/templates/Profiles';
import ItemsOnsale from 'src/components/templates/ItemsOnSale';
import Header from 'src/components/templates/Header';

const Home = () => (
  <>
    <Header />
    <TopBanner />
    <Events />
    <Profiles />
    <ItemsOnsale />
  </>
);

export default Home;
