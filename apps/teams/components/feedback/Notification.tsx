import Link from 'next/link';
import {
  Box,
  Button,
  Flex,
  HStack,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';

export const Notification = ({ path }: any) => (
  <Box as='section' position='fixed' bottom='2' right='2'>
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
                It looks like you have an unfinished Team!
              </Text>
              <Progress
                colorScheme='secondary'
                borderRadius='lg'
                size='sm'
                value={50}
                bg='dark.500'
              />
            </Stack>
          </HStack>
          <Link href={path}>
            <Button variant='secondary' size='sm'>
              Finish
            </Button>
          </Link>
        </HStack>
      </Box>
    </Flex>
  </Box>
);
