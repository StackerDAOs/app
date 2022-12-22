import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Circle,
  Heading,
  HStack,
  Icon,
  ListItem,
  SimpleGrid,
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  UnorderedList,
  // useBreakpointValue,
} from 'ui';
import { MainNavbar } from '@components/navigation';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { ArrowRight, CheckCircle, InfoIcon } from 'ui/components/icons';
import { Banner } from '@components/misc';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { appUrl } from 'utils';
import { map } from 'lodash';

export default function GetStarted() {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedProduct, setSelectedProduct] = React.useState<
    string | undefined | any
  >(undefined);
  const ref = React.useRef(null);
  const handleScrollTo = (value: string) => {
    setSelectedProduct(value);
    setTimeout(() => {
      const current = ref?.current as any;
      if (current) {
        current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderProductDetails = (product: string) => {
    switch (product) {
      case '1':
        return (
          <Box bg='dark.900' ref={ref}>
            <Box as='section' pt='24' pb='12'>
              <Box py='3' px='12'>
                <SimpleGrid columns={{ base: 1, lg: 2 }}>
                  <Stack flex='1' maxW={{ lg: 'lg' }} spacing='6'>
                    <Heading
                      as='h1'
                      color='primary.900'
                      size='4xl'
                      fontWeight='black'
                    >
                      Clubs
                    </Heading>
                    <Text
                      color='light.500'
                      fontWeight='light'
                      fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                      maxW='5xl'
                      letterSpacing='tight'
                    >
                      Permissionless DAOs to govern open communities and
                      networks. Perfect for protocol DAOs, NFT communities,
                      ecosystem DAOs, and more.
                    </Text>
                    <ButtonGroup spacing='6'>
                      <Button
                        as='a'
                        href={`${appUrl.clubs}/create`}
                        variant='default'
                        size='lg'
                        fontWeight='medium'
                      >
                        Create Club
                      </Button>
                      <Link href='/clubs'>
                        <Button
                          variant='link'
                          size='lg'
                          fontWeight='medium'
                          rightIcon={<ArrowRight />}
                        >
                          More details
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </Stack>
                  <Tabs
                    color='primary.900'
                    variant='unstyled'
                    minH='50vh'
                    isFitted
                  >
                    <TabList>
                      <Stack
                        direction='row'
                        minW='100%'
                        bg='dark.700'
                        borderRadius='lg'
                        p='1'
                      >
                        {map(
                          ['How Clubs Work', 'Important Club Details'],
                          (item) => (
                            <Tab
                              key={item}
                              fontSize='md'
                              borderRadius='lg'
                              color='light.500'
                              m='0'
                              _selected={{
                                color: 'light.900',
                                bg: 'dark.900',
                              }}
                            >
                              {item}
                            </Tab>
                          ),
                        )}
                      </Stack>
                    </TabList>
                    <TabPanels>
                      <TabPanel px='0'>
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                        >
                          <UnorderedList spacing='3'>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Members receive Club Passes (NFTs) that allow
                                them to submit proposals and deposit.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Club Pass holders deposit STX into the Club and
                                receive fungible governance tokens granting them
                                voting power commensurate with their pro-rata
                                share of STX raised.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Automatically execute deplyoment of funds when
                                voters approve proposals.
                              </Text>
                            </ListItem>
                          </UnorderedList>
                        </motion.div>
                      </TabPanel>
                      <TabPanel px='0'>
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                        >
                          <UnorderedList spacing='3'>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Both Club Passes and governance tokens are
                                non-transferable.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                The Club will not operate until the initial
                                fundraising window ends (the Club can open
                                subsequent fundraising windows via approved
                                proposals).
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Members can exit the Club at any time by
                                “ragequitting”—burning their tokens and
                                receiving their pro rata share of liquid STX
                                (and only liquid STX).
                              </Text>
                            </ListItem>
                          </UnorderedList>
                        </motion.div>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </SimpleGrid>
              </Box>
            </Box>
            <Banner
              icon={InfoIcon}
              message='Clubs is currently in beta. While the smart contracts that
                you can interact with on our platform have been thoroughly
                reviewed and tested, they are still pending audit and bugs may
                be present. You agree to use Clubs at your own risk.'
              px='12'
              py='6'
              bg='dark.800'
              borderTopWidth='1px'
              borderTopColor='dark.500'
            />
          </Box>
        );
      case '2':
        return (
          <Box bg='dark.900' ref={ref}>
            <Box as='section' pt='24' pb='12'>
              <Box py='3' px='12'>
                <SimpleGrid columns={{ base: 1, lg: 2 }}>
                  <Stack flex='1' maxW={{ lg: 'lg' }} spacing='6'>
                    <Heading
                      as='h1'
                      color='light.900'
                      size='4xl'
                      fontWeight='black'
                    >
                      <Text
                        as='span'
                        fontWeight='light'
                        bgGradient='linear(to-br, #624AF2 5%, #27cb9f 100%)'
                        bgClip='text'
                        letterSpacing='tight'
                        pr='1'
                      >
                        Stacker
                      </Text>
                      DAOs
                    </Heading>
                    <Text
                      color='light.500'
                      fontWeight='light'
                      fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                      maxW='5xl'
                      letterSpacing='tight'
                    >
                      Permissionless DAOs to govern open networks and
                      communities. Perfect for protocol DAOs, NFT communities,
                      ecosystem DAOs, and more.
                    </Text>
                    <ButtonGroup spacing='6'>
                      <Button
                        variant='default'
                        size='lg'
                        fontWeight='medium'
                        as='a'
                        href='https://form.typeform.com/to/zfYJYLgV'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Get in touch
                      </Button>
                      <Link href='/daos'>
                        <Button
                          variant='link'
                          size='lg'
                          fontWeight='medium'
                          rightIcon={<ArrowRight />}
                        >
                          More details
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </Stack>
                  <Tabs
                    color='primary.900'
                    variant='unstyled'
                    minH='50vh'
                    isFitted
                  >
                    <TabList>
                      <Stack
                        direction='row'
                        minW='100%'
                        bg='dark.700'
                        borderRadius='lg'
                        p='1'
                      >
                        {map(
                          [
                            'How StackerDAOs Work',
                            'Important StackerDAOs Details',
                          ],
                          (item) => (
                            <Tab
                              key={item}
                              fontSize='md'
                              borderRadius='lg'
                              color='light.500'
                              m='0'
                              _selected={{
                                color: 'light.900',
                                bg: 'dark.900',
                              }}
                            >
                              {item}
                            </Tab>
                          ),
                        )}
                      </Stack>
                    </TabList>
                    <TabPanels>
                      <TabPanel px='0'>
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                        >
                          <UnorderedList spacing='3'>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                The creator elects an existing fungible token or
                                NFT to serve as the governance token.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                1 governance token equals 1 vote; voters can
                                delegate voting power.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                The creator elects a threshold amount of
                                governance tokens to submit proposals.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Automatically execute on-chain actions when
                                voters approve proposals.
                              </Text>
                            </ListItem>
                          </UnorderedList>
                        </motion.div>
                      </TabPanel>
                      <TabPanel px='0'>
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                        >
                          <UnorderedList spacing='3'>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                The governance token must be deployed elsewhere
                                before launching a StackerDAO. We do not enable
                                the deployment of tradeable tokens on our
                                platform.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                There is no out of the box mechanism to obtain
                                funds.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                The creator should have in mind a source of
                                funds, such as depositing the DAO’s own tokens
                                in its treasury, NFT mint and royalty fees, or
                                protocol/product revenue.
                              </Text>
                            </ListItem>
                          </UnorderedList>
                        </motion.div>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </SimpleGrid>
              </Box>
            </Box>
            <Banner
              icon={InfoIcon}
              message='StackerDAOs is currently in beta. While the smart contracts that
                you can interact with on our platform have been thoroughly
                reviewed and tested, they are still pending audit and bugs may
                be present. You agree to use StackerDAOs at your own risk.'
              px='12'
              py='6'
              bg='dark.800'
              borderTopWidth='1px'
              borderTopColor='dark.500'
            />
          </Box>
        );
      case '3':
        return (
          <Box bg='dark.900' ref={ref}>
            <Box as='section' pt='24' pb='12'>
              <Box py='3' px='12'>
                <SimpleGrid columns={{ base: 1, lg: 2 }}>
                  <Stack flex='1' maxW={{ lg: 'lg' }} spacing='6'>
                    <Heading
                      as='h1'
                      color='secondary.900'
                      size='4xl'
                      fontWeight='black'
                    >
                      Teams
                    </Heading>
                    <Text
                      color='light.500'
                      fontWeight='light'
                      fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                      maxW='5xl'
                      letterSpacing='tight'
                    >
                      Multisig tool for working groups to manage assets and
                      smart contracts. Perfect for companies, projects, subDAOs,
                      and early DAOs progressively decentralizing.
                    </Text>
                    <ButtonGroup spacing='6'>
                      <Button
                        as='a'
                        href={`${appUrl.teams}/create`}
                        variant='default'
                        size='lg'
                        fontWeight='medium'
                      >
                        Create Team
                      </Button>
                      <Link href='/teams'>
                        <Button
                          variant='link'
                          size='lg'
                          fontWeight='medium'
                          rightIcon={<ArrowRight />}
                        >
                          More details
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </Stack>
                  <Tabs
                    color='primary.900'
                    variant='unstyled'
                    minH='50vh'
                    isFitted
                  >
                    <TabList>
                      <Stack
                        direction='row'
                        minW='100%'
                        bg='dark.700'
                        borderRadius='lg'
                        p='1'
                      >
                        {map(
                          ['How Teams Work', 'Important Teams Details'],
                          (item) => (
                            <Tab
                              key={item}
                              fontSize='md'
                              borderRadius='lg'
                              color='light.500'
                              m='0'
                              _selected={{
                                color: 'light.900',
                                bg: 'dark.900',
                              }}
                            >
                              {item}
                            </Tab>
                          ),
                        )}
                      </Stack>
                    </TabList>
                    <TabPanels>
                      <TabPanel px='0'>
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                        >
                          <UnorderedList spacing='3'>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                The creator includes the addresses of fellow
                                Team members in the creation flow.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Each Team member has 1 vote.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Each Team member can submit a proposal.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Automatically execute on-chain actions when
                                voters approve proposals.
                              </Text>
                            </ListItem>
                          </UnorderedList>
                        </motion.div>
                      </TabPanel>
                      <TabPanel px='0'>
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                        >
                          <UnorderedList spacing='3'>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                Proposal submissions and voting are not
                                separated.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                There is no out of the box mechanism to obtain
                                funds.
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text
                                color='light.500'
                                fontWeight='light'
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                                maxW='5xl'
                                letterSpacing='tight'
                              >
                                The creator should have in mind a source of
                                funds, such as depositing the DAO’s own tokens
                                in its treasury, NFT mint and royalty fees, or
                                protocol/product revenue.
                              </Text>
                            </ListItem>
                          </UnorderedList>
                        </motion.div>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </SimpleGrid>
              </Box>
            </Box>
            <Banner
              icon={InfoIcon}
              message='Teams is currently in beta. While the smart contracts that
                you can interact with on our platform have been thoroughly
                reviewed and tested, they are still pending audit and bugs may
                be present. You agree to use Teams at your own risk.'
              px='12'
              py='6'
              bg='dark.800'
              borderTopWidth='1px'
              borderTopColor='dark.500'
            />
          </Box>
        );
      default:
        break;
    }
    return null;
  };
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <Box as='section'>
        <MainNavbar />
        <Stack
          as='section'
          py={{ base: '16', md: '24' }}
          backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
          opacity='1'
        >
          <Box as='section' pt={{ base: '8', md: '16' }} px='12'>
            <Stack spacing='8' align='flex-start'>
              <Heading
                fontSize={{ base: '4xl', lg: '5xl' }}
                fontWeight='semibold'
                lineHeight='1.2'
                bg='light.900'
                bgClip='text'
                letterSpacing='tight'
              >
                Learn more about each structure and select what&apos;s best for
                your use case
              </Heading>
              <SimpleGrid
                as={RadioCardGroup}
                onChange={(value: any) => handleScrollTo(value)}
                spacing='3'
                direction='row'
                columns={{ base: 1, lg: 3 }}
              >
                <RadioCard value='1' p='2' borderRadius='lg'>
                  <Stack spacing='0'>
                    <Stack
                      px={{ base: '6', md: '6' }}
                      py={{ base: '6', md: '6' }}
                      spacing='2'
                    >
                      <Stack spacing='6'>
                        <HStack align='center' spacing='4'>
                          <Circle
                            size='10'
                            bg='dark.800'
                            borderWidth='1px'
                            borderColor='dark.500'
                          >
                            {selectedProduct === '1' && (
                              <Icon
                                as={CheckCircle}
                                boxSize='6'
                                color='primary.900'
                              />
                            )}
                          </Circle>
                          <Heading size='lg' fontWeight='regular'>
                            Clubs
                          </Heading>
                        </HStack>
                        <Stack spacing='0'>
                          <Text
                            color='light.900'
                            fontWeight='extrabold'
                            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                            letterSpacing='tight'
                          >
                            Best for
                          </Text>
                          <Text
                            color='light.500'
                            fontWeight='light'
                            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                            letterSpacing='tight'
                          >
                            Investment DAOs, Investment DAOs, impact DAOs,
                            service impact DAOs, service DAOs, and more.
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </RadioCard>
                <RadioCard value='2' p='2' borderRadius='lg'>
                  <Stack spacing='0'>
                    <Stack
                      px={{ base: '6', md: '6' }}
                      py={{ base: '6', md: '6' }}
                      spacing='2'
                    >
                      <Stack spacing='6'>
                        <HStack align='center' spacing='4'>
                          <Circle
                            size='10'
                            bg='dark.800'
                            borderWidth='1px'
                            borderColor='dark.500'
                          >
                            {selectedProduct === '2' && (
                              <Icon
                                as={CheckCircle}
                                boxSize='6'
                                color='primary.900'
                              />
                            )}
                          </Circle>
                          <Heading size='lg' fontWeight='regular'>
                            StackerDAOs
                          </Heading>
                        </HStack>
                        <Stack spacing='0'>
                          <Text
                            color='light.900'
                            fontWeight='extrabold'
                            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                            letterSpacing='tight'
                          >
                            Best for
                          </Text>
                          <Text
                            color='light.500'
                            fontWeight='light'
                            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                            letterSpacing='tight'
                          >
                            Protocol DAOs, NFT Investment DAOs, communities,
                            impact DAOs, service ecosystem DAOs, DAOs, and more.
                            media DAOs, and more.
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </RadioCard>
                <RadioCard value='3' p='2' borderRadius='lg'>
                  <Stack spacing='0'>
                    <Stack
                      px={{ base: '6', md: '6' }}
                      py={{ base: '6', md: '6' }}
                      spacing='2'
                    >
                      <Stack spacing='6'>
                        <HStack align='center' spacing='4'>
                          <Circle
                            size='10'
                            bg='dark.800'
                            borderWidth='1px'
                            borderColor='dark.500'
                          >
                            {selectedProduct === '3' && (
                              <Icon
                                as={CheckCircle}
                                boxSize='6'
                                color='primary.900'
                              />
                            )}
                          </Circle>
                          <Heading size='lg' fontWeight='regular'>
                            Teams
                          </Heading>
                        </HStack>
                        <Stack spacing='0'>
                          <Text
                            color='light.900'
                            fontWeight='extrabold'
                            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                            letterSpacing='tight'
                          >
                            Best for
                          </Text>
                          <Text
                            color='light.500'
                            fontWeight='light'
                            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                            letterSpacing='tight'
                          >
                            Companies, projects, Investment DAOs, subDAOs, early
                            DAOs, impact DAOs, service and more.
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </RadioCard>
              </SimpleGrid>
            </Stack>
          </Box>
        </Stack>
        {renderProductDetails(selectedProduct)}
      </Box>
    </motion.div>
  );
}
