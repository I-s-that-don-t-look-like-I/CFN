import React from 'react';
import { Button, ChakraProvider } from '@chakra-ui/react';
import MyProfile from './routes/MyProfile';
import Home from './routes/Home';
import { useReducer } from 'react';

function App() {
  function pageChanger(action) {
    switch (action.type) {
      case 'HOME':
        return <Home />;
      case 'MYPROFILE':
        return <MyProfile />;
      default:
        return <Home />;
    }
  }
  const [page, dispatch] = useReducer(pageChanger, <Home />);

  return (
    <ChakraProvider>
      {page}
      <Button onClick={() => dispatch({ type: 'HOME' })}>Home</Button>
      <Button onClick={() => dispatch({ type: 'MYPROFILE' })}>MyProfile</Button>
    </ChakraProvider>
  );
}

export default App;
