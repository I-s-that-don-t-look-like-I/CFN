import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './routes/Home';
import PageContents from './routes/PageContents';
import { useState } from 'react';

function App() {
  const [pageState, setPageState] = useState(<Home />);
  function
  useEffect(() => {

  }, [pageState]);
  return <ChakraProvider>{pageState}</ChakraProvider>;
}

export default App;
