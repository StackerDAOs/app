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
import { IdeaDrawer, ProposalDrawer } from '@components/drawers';
import { useAuth } from 'ui/components';
import { useDAO } from 'ui/hooks';

import { Wrapper } from '../containers';
import { Clipboard } from '../feedback';

const hasExtension = (extensions: any, extensionToFind: string) =>
  findExtension(extensions, extensionToFind);

export const SetupHeader = ({ isCentered }: { isCentered?: boolean }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log('centered', isCentered);

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
          display={isMobile ? 'block' : 'flex'}
          direction={{ base: 'column', md: 'row' }}
          justify={isCentered ? 'center' : 'space-between'}
          align='flex-start'
        >
          <Stack justify='space-between' spacing='6'>
            <HStack>
              <Heading
                size='2xl'
                fontWeight='black'
                color='light.900'
                bgGradient='linear(to-b, light.900 25%, light.500 100%)'
                bgClip='text'
              >
                Deployment and Setup
              </Heading>
            </HStack>
          </Stack>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const DashboardHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();
  const { isSignedIn } = useAuth();
  const isActive = dao?.data?.active;

  if (!dao?.data || !isSignedIn) return null;

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
              <Heading
                size='2xl'
                fontWeight='black'
                color='light.900'
                bgGradient='linear(to-b, light.900 25%, light.500 100%)'
                bgClip='text'
              >
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
            <Text fontSize='lg' fontWeight='light' color='light.500' maxW='3xl'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          {isActive && (
            <ButtonGroup>
              <ProposalDrawer title='Create proposal' variant='default' />
            </ButtonGroup>
          )}
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const VaultHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');

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
              <Heading
                size='2xl'
                fontWeight='black'
                color='light.900'
                bgGradient='linear(to-b, light.900 25%, light.500 100%)'
                bgClip='text'
              >
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
              >
                {hasExtension(dao?.data?.extensions, 'Vault') ? (
                  <HStack>
                    <a
                      href={getExplorerLink(vaultExtension?.contract_address)}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Text
                        as='span'
                        cursor='pointer'
                        fontSize='sm'
                        fontWeight='light'
                      >
                        {truncateAddress(vaultExtension?.contract_address)}
                      </Text>
                    </a>
                    <Clipboard
                      color='light.900'
                      fontSize='sm'
                      content={vaultExtension?.contract_address}
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
            <Text fontSize='lg' fontWeight='light' color='light.500' maxW='3xl'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          <ButtonGroup>
            <ProposalDrawer title='Create proposal' variant='default' />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const ProposalHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();
  const submissionExtension = findExtension(
    dao?.data?.extensions,
    'Submission',
  );

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
              <Heading
                size='2xl'
                fontWeight='black'
                color='light.900'
                bgGradient='linear(to-b, light.900 25%, light.500 100%)'
                bgClip='text'
              >
                Ideas
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
              >
                {hasExtension(dao?.data?.extensions, 'Submission') ? (
                  <HStack>
                    <a
                      href={getExplorerLink(
                        submissionExtension?.contract_address,
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
                        {truncateAddress(submissionExtension?.contract_address)}
                      </Text>
                    </a>
                    <Clipboard
                      color='light.900'
                      fontSize='sm'
                      content={submissionExtension?.contract_address}
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
            <Text fontSize='lg' fontWeight='light' color='light.500' maxW='3xl'>
              A Club Pass is required to submit an idea and vote on others.
              There is no limit to the number of ideas you can submit and vote
              on.
            </Text>
          </Stack>
          <ButtonGroup>
            <IdeaDrawer title='Create an idea' variant='default' />
          </ButtonGroup>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};

export const VotingHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dao = useDAO();
  const votingExtension = findExtension(dao?.data?.extensions, 'Voting');

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
              <Heading
                size='2xl'
                fontWeight='black'
                color='light.900'
                bgGradient='linear(to-b, light.900 25%, light.500 100%)'
                bgClip='text'
              >
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
              >
                {hasExtension(dao?.data?.extensions, 'Voting') ? (
                  <HStack>
                    <a
                      href={getExplorerLink(votingExtension?.contract_address)}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Text
                        as='span'
                        cursor='pointer'
                        fontSize='sm'
                        fontWeight='light'
                      >
                        {truncateAddress(votingExtension?.contract_address)}
                      </Text>
                    </a>
                    <Clipboard
                      color='light.900'
                      fontSize='sm'
                      content={votingExtension?.contract_address}
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
            <Text fontSize='lg' fontWeight='light' color='light.500' maxW='3xl'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
          <ButtonGroup>
            <ProposalDrawer title='Create proposal' variant='default' />
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
          <Stack justify='flex-start' spacing='3'>
            <HStack>
              <Heading
                size='2xl'
                fontWeight='black'
                color='light.900'
                bgGradient='linear(to-b, light.900 25%, light.500 100%)'
                bgClip='text'
              >
                Extensions
              </Heading>
            </HStack>
            <Text fontSize='lg' fontWeight='light' color='light.500' maxW='3xl'>
              Members with a Club Pass can deposit funds and submit proposals
              once the initial fundraise window ends. Only members who have
              deposited funds can vote.
            </Text>
          </Stack>
        </Stack>
      </motion.div>
    </Wrapper>
  );
};
