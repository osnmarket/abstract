import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { MediaContextProvider } from '../lib/utils/media';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

// 3. Pass the `theme` prop to the `ChakraProvider`
function ApiDocs({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <MediaContextProvider>
        <Component {...pageProps} />
      </MediaContextProvider>
    </ChakraProvider>
  );
}

export default ApiDocs;
