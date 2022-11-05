import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './routes/Home';
function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
