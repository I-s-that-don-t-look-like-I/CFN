import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './routes/Home';

import Header from './components/templates/Header';
import NFTs from './routes/NFTs';
import Actors from './routes/Actors';

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Header />
      <main>
        <Home />
      </main>
    </ChakraProvider>
  );
}

export default App;
