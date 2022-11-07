import React from 'react';

import TopBanner from 'src/components/templates/TopBanner';
import Events from 'src/components/templates/Events';
import Profiles from 'src/components/templates/Profiles';
import ItemsOnsale from 'src/components/templates/ItemsOnSale';
import Header from 'src/components/templates/Header';
import SidebarWithHeader from 'src/components/templates/SidebarWithHeader';

const Home = () => (
  <>
    <SidebarWithHeader>
      <TopBanner />
      <Events />
      <Profiles />
      <ItemsOnsale />
    </SidebarWithHeader>
  </>
);

export default Home;
