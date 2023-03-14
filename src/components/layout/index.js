import { Box, Container, Stack } from '@chakra-ui/react';
import { Header } from './Header';

export const Layout = ({ active, children }) => {
  return (
    <Stack>
      <Header active={active} />
      <Box>
        <Container variant={'fluid'} minW={'container.xl'} h={'100%'}>
          {children}
        </Container>
      </Box>
    </Stack>
  );
};
