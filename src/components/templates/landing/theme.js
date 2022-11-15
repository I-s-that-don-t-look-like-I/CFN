import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'orange.100',
      },
    },
  },
  fonts: {
    body: `"SEBANG_Gothic_Bold", sans-serif`,
    heading: `"SEBANG_Gothic_Bold", sans-serif`,
  },
});

export default theme;
