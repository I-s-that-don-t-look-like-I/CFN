import React from 'react';
import { Grid, GridItem, Image, Input, Box, Spacer } from '@chakra-ui/react';
import DrawerLeft from '../components/Drawer';
import SearchPopover from '../components/SearchPopover';

const Home = () => (
  <>
    <Grid
      templateAreas={`"header header"
                  "main main"
                  `}
      gridTemplateRows={'70px 1fr'}
      gridTemplateColumns={'0px 1fr'}
      h="5000px"
      gap="0.5"
      color="White"
      fontWeight="bold"
    >
      <GridItem pl="3" bg="#141A1E" area={'header'}>
        <Image borderRadius="full" boxSize="30px" src="src/img/cfn_logo.png" />
        <span>
          <DrawerLeft />
          <SearchPopover />
        </span>
      </GridItem>
      {/* <GridItem pl="3" bg="#141A1E" area={'nav'}></GridItem> */}
      <GridItem pl="3" bg="#141A1E" area={'main'}>
        Main
      </GridItem>
    </Grid>
  </>
);

export default Home;
