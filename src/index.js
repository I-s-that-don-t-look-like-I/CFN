import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import KaikasAuthPorvider from './components/molecules/KaikasAuthProviedr';
import { BrowserRouter } from 'react-router-dom';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mock/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <KaikasAuthPorvider>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </KaikasAuthPorvider>
    <ToastContainer theme="colored" />
  </StrictMode>
);
