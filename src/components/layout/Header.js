import { colors, messages } from '@/theme';
import {
  Box,
  Button,
  Container,
  Highlight,
  HStack,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';
import { Categories } from '@components/func/lists/Categories';

export const Header = ({ active }) => (
  <Box bgColor={colors.secondary} h={112}>
    <Container variant={'fluid'} minW={'container.xl'} h={'100%'}>
      <VStack h={'100%'}>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          pt={4}
          w={'100%'}
        >
          <HStack alignItems={'center'} w={'50%'}>
            <Text fontWeight={'bold'} fontSize={25}>
              <Highlight query={'Abstract'} styles={{ color: colors.primary }}>
                {messages.components.header.sitename}
              </Highlight>
            </Text>

            <Box w={'60%'}>
              <Input
                bgColor={colors.white}
                borderColor={colors.gray.regular}
                borderRadius={8}
                h={36.01}
                placeholder={'Search documentation… try "Env keys”'}
              />
            </Box>
          </HStack>
          <HStack alignItems={'center'}>
            <Box>
              <Text color={colors.primary} fontSize={14}>
                Create an account
              </Text>
            </Box>
            <Button
              bgColor={'transparent'}
              borderWidth={1}
              borderColor={colors.gray.light}
              fontSize={12}
              h={22}
              w={64.01}
            >
              Sign in
            </Button>
          </HStack>
        </HStack>
        <HStack alignSelf={'flex-start'} h={'100%'} w={'100%'}>
          <Categories active={'browse'} />
        </HStack>
      </VStack>
    </Container>
  </Box>
);
