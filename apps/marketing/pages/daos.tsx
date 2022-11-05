import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Stack,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { ArrowRight } from 'ui/components/icons';
import { useScrollPosition } from 'ui/hooks/react';
import { MainNavbar, Footer } from '@components/navigation';
import { appUrl } from 'utils';

const features = [
  {
    name: 'Treasury',
    image: '/images/proposal-hero.png',
    description:
      'Manage fungible tokens and NFTs. Whitelist assets to protect your treasury. View your assets on our dashboard.',
  },
  {
    name: 'Proposals & Automatic Execution',
    image: '/images/proposal-hero.png',
    description:
      'Members can create, deploy, and submit proposals. Proposals are smart contracts—allowing the StackerDAO to automatically execute approved proposals for on-chain activity.',
  },
  {
    name: 'On-Chain Voting',
    image: '/images/proposal-hero.png',
    description:
      'Members that have deposited funds can vote on-chain with voter approved proposals automatically executing.',
  },
  {
    name: 'Off-Chain Temperature Checks',
    image: '/images/proposal-hero.png',
    description:
      'Members can create Ideas to receive guidance from the rest of the StackerDAO through upvotes and downvotes before submitting a formal on-chain proposal—all powered by off-chain authenticated wallet signatures.',
  },
  {
    name: 'Composable Extensions',
    image: '/images/proposal-hero.png',
    description:
      'Buy and sell NFTs, swap tokens, borrow and lend, and more. Extensions provide your StackerDAOs structure and allow it to do almost anything an individual wallet can do.',
  },
  {
    name: 'Delegation',
    image: '/images/proposal-hero.png',
    description: 'Members can delegate their voting power to other members.',
  },
];

export default function Clubs() {
  const scrollPosition = useScrollPosition();

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <MainNavbar shouldSwitchNav={scrollPosition > 400} />
      <Stack
        h='100vh'
        justify='center'
        align='center'
        backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
        opacity='1'
      >
        <Stack spacing='3' align='center'>
          <Text fontSize='xl' fontWeight='thin' color='light.500'>
            Protocol built with Stacks
          </Text>
          <Heading
            textAlign='center'
            fontSize={{ base: '4em', md: '8em', lg: '10em' }}
            fontWeight='black'
            w='100%'
          >
            <Text
              display='inline-block'
              fontWeight='light'
              bgGradient='linear(to-br, #624AF2 5%, #50DDC3 100%)'
              bgClip='text'
              letterSpacing='tight'
              mr='-5'
            >
              Stacker
            </Text>{' '}
            DAOs
          </Heading>
          <Stack spacing='8'>
            <Text
              textAlign='center'
              fontSize={{ base: '1.5em', lg: '2.5em' }}
              fontWeight='thin'
              color='light.900'
              letterSpacing='tight'
              maxW='3xl'
            >
              Govern open communities and networks. Together.
            </Text>
            <ButtonGroup
              spacing='6'
              m='0 auto'
              display='flex'
              justifyContent='center'
            >
              <Button
                as='a'
                href={`${appUrl.daos}`}
                variant='default'
                size='lg'
              >
                Get started
              </Button>
              <Button
                as='a'
                href='https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/stackerdao'
                target='_blank'
                variant='link'
                size='lg'
                color='light.900'
                fontWeight='medium'
                fontSize='xl'
                rightIcon={<ArrowRight />}
                _active={{
                  color: 'light.500',
                  opacity: 0.9,
                }}
                _hover={{
                  color: 'light.500',
                }}
              >
                Read docs
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing='12' py='3' px='12'>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          as={Flex}
          align='center'
          spacing='12'
          py='12'
        >
          <Stack flex='1' maxW={{ lg: 'lg' }} spacing='3'>
            <Heading
              as='h1'
              bgGradient='linear(to-br, #624AF2 5%, #50DDC3 100%)'
              bgClip='text'
              letterSpacing='tight'
              size='4xl'
              fontWeight='black'
            >
              Create
            </Heading>
            <Text
              color='light.500'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '3xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Turn your web3 community or network into a powerful DAO.
            </Text>
            <Text
              color='gray'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              maxW='5xl'
              letterSpacing='tight'
            >
              In just a few clicks, set up rules, decide who will receive a Club
              Pass, and launch your Club. Club Passes are NFTs that define your
              Club’s membership and enable your Club’s integration with other
              NFT powered apps.
            </Text>
          </Stack>
          <Image
            src='/images/clubs-hero.png'
            alt='Screenshot for Form builder'
            h='auto'
          />
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          as={Flex}
          align='center'
          spacing='12'
          py='12'
        >
          <Image
            src='/images/teams-hero.png'
            alt='Screenshot for Form builder'
            h='auto'
          />
          <Stack flex='1'>
            <Heading
              as='h1'
              bgGradient='linear(to-br, #624AF2 5%, #50DDC3 100%)'
              bgClip='text'
              letterSpacing='tight'
              size='4xl'
              fontWeight='black'
            >
              Take Action
            </Heading>
            <Text
              color='light.500'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '3xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Transfer funds, manage underlying smart contracts, and more.
              Together.
            </Text>
            <Text
              color='gray'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Submit proposals, vote, delegate, and collectively take action—all
              programatically. Never rely on individuals or centralized groups
              of for on-chain activity.
            </Text>
          </Stack>
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          as={Flex}
          align='center'
          spacing='12'
          py='12'
        >
          <Stack flex='1'>
            <Heading
              as='h1'
              bgGradient='linear(to-br, #624AF2 5%, #50DDC3 100%)'
              bgClip='text'
              letterSpacing='tight'
              size='4xl'
              fontWeight='black'
            >
              Customize
            </Heading>
            <Text
              color='light.500'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '3xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Our modular design allows your to customize or upgrade your
              StackerDAO to optimize for your mission.
            </Text>
            <Text
              color='gray'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Customize or upgrade your StackerDAO&apos;s governance structure,
              such as tiers of membership, different proposal submission and
              voting rules, and more.
            </Text>
          </Stack>
          <Image
            src='/images/teams-hero.png'
            alt='Screenshot for Form builder'
            h='auto'
          />
        </SimpleGrid>
      </Stack>
      <Divider borderColor='dark.500' />
      <Stack py={{ base: '10', lg: '16' }} px='12'>
        <Stack
          spacing={{ base: '4', md: '5' }}
          align='center'
          textAlign='center'
        >
          <Stack spacing='3'>
            <Heading
              as='h1'
              size='3xl'
              fontWeight='thin'
              lineHeight='1.2'
              letterSpacing='tight'
            >
              Complete suite of powerful DAO tools
            </Heading>
          </Stack>
        </Stack>
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing='12'
          py={{ base: '10', lg: '16' }}
        >
          {features.map((feature) => (
            <Stack
              key={feature.name}
              spacing={{ base: '4', md: '5' }}
              align='center'
              textAlign='center'
            >
              <Stack spacing={{ base: '1', md: '2' }} align='center'>
                <Image src={feature.image} alt={feature.name} />
                <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight='semibold'>
                  {feature.name}
                </Text>
                <Text fontSize='lg' color='light.500' letterSpacing='tight'>
                  {feature.description}
                </Text>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>

      <Footer />
    </motion.div>
  );
}
