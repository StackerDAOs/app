import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  Container,
} from 'ui';

import { LogoIcon } from 'ui/components/icons';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

export const Footer = () => (
  <Container as='footer' role='contentinfo' maxW='7xl'>
    <Stack
      spacing='8'
      direction={{ base: 'column', md: 'row' }}
      justify='space-between'
      py={{ base: '12', md: '16' }}
    >
      <Stack spacing={{ base: '6', md: '8' }} align='start'>
        <LogoIcon
          alt='logo'
          url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
          cursor='pointer'
          height='35px'
        />
        <Text color='muted'>Create beautiful websites remarkably fast.</Text>
      </Stack>
      <Stack
        direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
        spacing={{ base: '12', md: '8' }}
      >
        <Stack direction='row' spacing='8'>
          <Stack spacing='4' minW='36' flex='1'>
            <Text fontSize='sm' fontWeight='semibold' color='subtle'>
              Product
            </Text>
            <Stack spacing='3' shouldWrapChildren>
              <Button variant='link'>Teams</Button>
              <Button variant='link'>Investment Clubs</Button>
              <Button variant='link'>DAOs</Button>
            </Stack>
          </Stack>
          <Stack spacing='4' minW='36' flex='1'>
            <Text fontSize='sm' fontWeight='semibold' color='subtle'>
              Resources
            </Text>
            <Stack spacing='3' shouldWrapChildren>
              <Button variant='link'>Docs</Button>
              <Button variant='link'>Github</Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing='4'>
          <Text fontSize='sm' fontWeight='semibold' color='subtle'>
            Stay up to date
          </Text>
          <Stack
            spacing='4'
            direction={{ base: 'column', sm: 'row' }}
            maxW={{ lg: '360px' }}
          >
            <Input placeholder='Enter your email' type='email' required />
            <Button variant='primary' type='submit' flexShrink={0}>
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    <Divider />
    <Stack
      pt='8'
      pb='12'
      justify='space-between'
      direction={{ base: 'column-reverse', md: 'row' }}
      align='center'
    >
      <Text fontSize='sm' color='subtle'>
        &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
        reserved.
      </Text>
      <ButtonGroup variant='ghost'>
        <IconButton
          as='a'
          href='#'
          aria-label='Discord'
          icon={<FaDiscord fontSize='1.25rem' />}
        />
        <IconButton
          as='a'
          href='#'
          aria-label='GitHub'
          icon={<FaGithub fontSize='1.25rem' />}
        />
        <IconButton
          as='a'
          href='#'
          aria-label='Twitter'
          icon={<FaTwitter fontSize='1.25rem' />}
        />
      </ButtonGroup>
    </Stack>
  </Container>
);
