import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `"SEBANG_Gothic_Bold", sans-serif`,
    body: `"SEBANG_Gothic_Bold", sans-serif`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'orange.100',
      },
    },
  },
});

export default theme;
