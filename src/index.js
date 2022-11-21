import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import KaikasAuthPorvider from './components/molecules/KaikasAuthProviedr';
import { BrowserRouter } from 'react-router-dom';
import theme from 'src/styles/theme';
import Fonts from './styles/Fonts';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mock/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <ColorModeScript />
      <KaikasAuthPorvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </KaikasAuthPorvider>
      <ToastContainer theme="colored" />
    </ChakraProvider>
  </StrictMode>
);
