import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Progress,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { InfoIcon } from 'ui/components/icons';

export const Notification = (props: { path: string }) => (
  <Box as='section' position='fixed' bottom='5' right='5'>
    <Flex direction='row-reverse'>
      <Box
        width={{ base: 'full', sm: 'md' }}
        boxShadow='sm-dark'
        bg='dark.800'
        borderRadius='lg'
      >
        <HStack
          spacing='4'
          px='0'
          py='4'
          borderColor='dark.500'
          borderWidth='1px'
          borderRadius='lg'
          justify='space-around'
        >
          <HStack spacing='3'>
            <Stack>
              <Text fontWeight='medium' fontSize='sm'>
                It looks like you have an unfinished Club!
              </Text>
              <Progress
                colorScheme='primary'
                borderRadius='lg'
                size='sm'
                value={50}
                bg='dark.500'
              />
            </Stack>
          </HStack>
          <Link href={props?.path}>
            <Button variant='primary' size='sm'>
              Finish
            </Button>
          </Link>
        </HStack>
      </Box>
    </Flex>
  </Box>
);
