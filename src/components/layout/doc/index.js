import { Container, HStack, Stack } from '@chakra-ui/react';

export const DocLayout = ({ children }) => {
  return (
    <Stack>
      <Container maxW={'container.xl'}>
        <HStack alignItems={'flex-start'}>
          <Stack
            pt={'0.45rem'}
            pl={'1.45rem'}
            maxH={'90vh'}
            scrollBehavior={'smooth'}
            style={{ scrollbarWidth: 'none' }}
            overflowY={'scroll'}
            w={'85%'}
          >
            {children}
          </Stack>
        </HStack>
      </Container>
    </Stack>
  );
};
