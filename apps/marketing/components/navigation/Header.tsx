import {
  Badge,
  ButtonGroup,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { getExplorerLink } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { ProposalDrawer } from '@components/drawers';

import { Wrapper } from '../containers';
import { Clipboard } from '../feedback';

export const DashboardHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Wrapper>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          pt='12'
          pb='4'
          display={isMobile ? 'block' : 'flex'}
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack justify='space-between' spacing='3'>
            <HStack>
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Bitcoin Days{' '}
              </Heading>
            </HStack>
            <HStack spacing='3'>
              <Badge
                bg='dark.700'
                color='text-default'
                size='sm'
                border='1px solid'
                borderColor='dark.500'
                borderRadius='lg'
                py='1'
                px='3'
                _hover={{ opacity: 0.9 }}
              >
                <HStack>
                  <a
                    href={getExplorerLink(
                      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-core',
                    )}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Text
                      as='span'
                      cursor='pointer'
                      fontSize='sm'
                      fontWeight='light'
                    >
                      {truncateAddress(
                        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-core',
                      )}
                    </Text>
                  </a>

                  <Clipboard
                    color='light.900'
                    fontSize='sm'
                    content='address' // TODO: replace with address
                    _hover={{ cursor: 'pointer', color: 'light.900' }}
                  />
                </HStack>
              </Badge>
            </HStack>
            {/* <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text> */}
          </Stack>
          <ButtonGroup>
            <ProposalDrawer
              title='Create proposal'
              variant='default'
              isDisabled
              _hover={{ opacity: 0.9 }}
            />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const VaultHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Wrapper>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          pt='12'
          pb='4'
          display={isMobile ? 'block' : 'flex'}
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack justify='space-between' spacing='3'>
            <HStack>
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Bitcoin Days{' '}
                <Text
                  as='span'
                  maxW='2xl'
                  mx='auto'
                  color='gray'
                  fontWeight='thin'
                >
                  Vault
                </Text>
              </Heading>
            </HStack>
            <HStack spacing='3'>
              <Badge
                bg='dark.700'
                color='text-default'
                size='sm'
                border='1px solid'
                borderColor='dark.500'
                borderRadius='lg'
                py='1'
                px='3'
                _hover={{ opacity: 0.9 }}
              >
                <HStack>
                  <a
                    href={getExplorerLink(
                      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-vault',
                    )}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Text
                      as='span'
                      cursor='pointer'
                      fontSize='sm'
                      fontWeight='light'
                    >
                      {truncateAddress(
                        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-vault',
                      )}
                    </Text>
                  </a>

                  <Clipboard
                    color='light.900'
                    fontSize='sm'
                    content='address' // TODO: add dao address
                    _hover={{ cursor: 'pointer', color: 'light.900' }}
                  />
                </HStack>
              </Badge>
            </HStack>
            {/* <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text> */}
          </Stack>
          <ButtonGroup>
            <ProposalDrawer
              title='Create proposal'
              isDisabled
              variant='default'
              _hover={{ opacity: 0.9 }}
            />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const ProposalHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Wrapper>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          pt='12'
          pb='4'
          display={isMobile ? 'block' : 'flex'}
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack justify='space-between' spacing='3'>
            <HStack>
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Bitcoin Days{' '}
                <Text
                  as='span'
                  maxW='2xl'
                  mx='auto'
                  color='gray'
                  fontWeight='thin'
                >
                  Proposals
                </Text>
              </Heading>
            </HStack>
            <HStack spacing='3'>
              <Badge
                bg='dark.700'
                color='text-default'
                size='sm'
                border='1px solid'
                borderColor='dark.500'
                borderRadius='lg'
                py='1'
                px='3'
                _hover={{ opacity: 0.9 }}
              >
                <HStack>
                  <a
                    href={getExplorerLink(
                      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-submission',
                    )}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Text
                      as='span'
                      cursor='pointer'
                      fontSize='sm'
                      fontWeight='light'
                    >
                      {truncateAddress(
                        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-submission',
                      )}
                    </Text>
                  </a>

                  <Clipboard
                    color='light.900'
                    fontSize='sm'
                    content='address' // TODO: add dao address
                    _hover={{ cursor: 'pointer', color: 'light.900' }}
                  />
                </HStack>
              </Badge>
            </HStack>
            {/* <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text> */}
          </Stack>
          <ButtonGroup>
            <ProposalDrawer
              title='Create idea'
              isDisabled
              variant='default'
              _hover={{ opacity: 0.9 }}
            />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const VotingHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Wrapper>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          pt='12'
          pb='4'
          display={isMobile ? 'block' : 'flex'}
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack justify='space-between' spacing='3'>
            <HStack>
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Bitcoin Days{' '}
                <Text
                  as='span'
                  maxW='2xl'
                  mx='auto'
                  color='gray'
                  fontWeight='thin'
                >
                  Voting
                </Text>
              </Heading>
            </HStack>
            <HStack spacing='3'>
              <Badge
                bg='dark.700'
                color='text-default'
                size='sm'
                border='1px solid'
                borderColor='dark.500'
                borderRadius='lg'
                py='1'
                px='3'
                _hover={{ opacity: 0.9 }}
              >
                <HStack>
                  <a
                    href={getExplorerLink(
                      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-voting',
                    )}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Text
                      as='span'
                      cursor='pointer'
                      fontSize='sm'
                      fontWeight='light'
                    >
                      {truncateAddress(
                        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoindays-voting',
                      )}
                    </Text>
                  </a>

                  <Clipboard
                    color='light.900'
                    fontSize='sm'
                    content='address' // TODO: add dao address
                    _hover={{ cursor: 'pointer', color: 'light.900' }}
                  />
                </HStack>
              </Badge>
            </HStack>
            {/* <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text> */}
          </Stack>
          <ButtonGroup>
            <ProposalDrawer
              title='Create proposal'
              isDisabled
              variant='default'
              _hover={{ opacity: 0.9 }}
            />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const ExtensionsHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Wrapper>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          pt='12'
          pb='4'
          display={isMobile ? 'block' : 'flex'}
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack justify='space-between' spacing='3'>
            <HStack>
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Bitcoin Days{' '}
                <Text
                  as='span'
                  maxW='2xl'
                  mx='auto'
                  color='gray'
                  fontWeight='thin'
                >
                  Extensions
                </Text>
              </Heading>
            </HStack>
            {/* <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text> */}
          </Stack>
          <ButtonGroup>
            <ProposalDrawer
              title='Create proposal'
              isDisabled
              variant='default'
              _hover={{ opacity: 0.9 }}
            />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};
