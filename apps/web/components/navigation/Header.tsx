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
import { getExplorerLink, findExtension } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import Avatar from 'boring-avatars';
import { ProposalDrawer } from '@components/drawers';
import { useDAO } from 'ui/hooks';

import { Wrapper } from '../containers';
import { Clipboard } from '../feedback';

const hasExtension = (extensions: any, extensionToFind: string) =>
  findExtension(extensions, extensionToFind);

export const DashboardHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();

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
              <Avatar
                size={40}
                name={dao?.data?.name}
                variant='marble'
                colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
              />
              <Heading size='2xl' fontWeight='black' color='light.900'>
                {dao?.data?.name}{' '}
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
                    href={getExplorerLink(dao?.data?.contract_address)}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Text
                      as='span'
                      cursor='pointer'
                      fontSize='sm'
                      fontWeight='light'
                    >
                      {truncateAddress(dao?.data?.contract_address)}
                    </Text>
                  </a>
                  <Clipboard
                    color='light.900'
                    fontSize='sm'
                    content={dao?.data?.contract_address}
                    _hover={{ cursor: 'pointer', color: 'light.900' }}
                  />
                </HStack>
              </Badge>
            </HStack>
            <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          <ButtonGroup>
            <ProposalDrawer
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
  const dao = useDAO();

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
              <Avatar
                size={40}
                name={dao?.data?.name}
                variant='marble'
                colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
              />
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Vault
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
                {hasExtension(dao?.data?.extensions, 'Vault') ? (
                  <HStack>
                    <a
                      href={getExplorerLink(
                        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.mega-vault',
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
                          'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.mega-vault',
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
                ) : (
                  <Text
                    as='span'
                    cursor='pointer'
                    fontSize='sm'
                    fontWeight='light'
                  >
                    No contract found
                  </Text>
                )}
              </Badge>
            </HStack>
            <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          <ButtonGroup>
            <ProposalDrawer variant='default' _hover={{ opacity: 0.9 }} />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const ProposalHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();

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
              <Avatar
                size={40}
                name={dao?.data?.name}
                variant='marble'
                colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
              />
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Proposals
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
                {hasExtension(dao?.data?.etensions, 'Submission') ? (
                  <HStack>
                    <a
                      href={getExplorerLink(
                        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.mega-vault',
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
                          'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.mega-vault',
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
                ) : (
                  <Text
                    as='span'
                    cursor='pointer'
                    fontSize='sm'
                    fontWeight='light'
                  >
                    No contract found
                  </Text>
                )}
              </Badge>
            </HStack>
            <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          <ButtonGroup>
            <ProposalDrawer variant='default' _hover={{ opacity: 0.9 }} />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const VotingHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();

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
              <Avatar
                size={40}
                name={dao?.data?.name}
                variant='marble'
                colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
              />
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Voting
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
                {hasExtension(dao?.data?.etensions, 'Voting') ? (
                  <HStack>
                    <a
                      href={getExplorerLink(
                        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.mega-vault',
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
                          'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.mega-vault',
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
                ) : (
                  <Text
                    as='span'
                    cursor='pointer'
                    fontSize='sm'
                    fontWeight='light'
                  >
                    No contract found
                  </Text>
                )}
              </Badge>
            </HStack>
            <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          <ButtonGroup>
            <ProposalDrawer variant='default' _hover={{ opacity: 0.9 }} />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const ExtensionsHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();

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
              <Avatar
                size={40}
                name={dao?.data?.name}
                variant='marble'
                colors={['#50DDC3', '#624AF2', '#EB00FF', '#7301FA', '#25C2A0']}
              />
              <Heading size='2xl' fontWeight='black' color='light.900'>
                Extensions
              </Heading>
            </HStack>
            <Text fontSize='lg' fontWeight='light' color='text-default'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          <ButtonGroup>
            <ProposalDrawer variant='default' _hover={{ opacity: 0.9 }} />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};
