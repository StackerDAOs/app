import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Flex,
  Text,
  Icon,
  Image,
  SimpleGrid,
  Stack,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import {
  ArrowRight,
  ExtensionIcon,
  OnchainIcon,
  RagequitIcon,
  ProposalIcon,
  TempCheckIcon,
  VaultIcon,
} from 'ui/components/icons';
import { useScrollPosition } from 'ui/hooks/react';
import { MainNavbar, Footer } from '@components/navigation';
import { appUrl } from 'utils';

const features = [
  {
    name: 'Treasury',
    icon: VaultIcon,
    description:
      'Manage fungible tokens and NFTs. Whitelist assets to protect your treasury. View your assets on our dashboard.',
  },
  {
    name: 'Proposals & Automatic Execution',
    icon: ProposalIcon,
    description:
      'Members can create, deploy, and submit proposals. Proposals are smart contracts—allowing the Club to automatically execute approved proposals for on-chain activity.',
  },
  {
    name: 'On-Chain Voting',
    icon: OnchainIcon,
    description:
      'Members that have deposited funds can vote on-chain with voter approved proposals automatically executing.',
  },
  {
    name: 'Off-Chain Temperature Checks',
    icon: TempCheckIcon,
    description:
      'Members can create Ideas to receive guidance from the rest of the Club through upvotes and downvotes before submitting a formal on-chain proposal—all powered by off-chain authenticated wallet signatures.',
  },
  {
    name: 'Composable Extensions',
    icon: ExtensionIcon,
    description:
      'Buy and sell NFTs, swap tokens, borrow and lend, and more. Extensions provide your Club’s structure and allow it to do almost anything an individual wallet can do.',
  },
  {
    name: 'Ragequit',
    icon: RagequitIcon,
    description:
      'Members can exit the Club at anytime (or "ragequit") by burning their Club Pass and governance tokens in return for their pro-rata share of liquid STX in the Club’s treasury.',
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
            fontSize={{ base: '4em', md: '8em', lg: '12em' }}
            fontWeight='black'
            color='primary.900'
            w='100%'
          >
            Clubs
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
              Invest, fund causes, build products, and more. Together.
            </Text>
            <ButtonGroup
              spacing='6'
              m='0 auto'
              display='flex'
              justifyContent='center'
            >
              <Button
                as='a'
                href={`${appUrl.clubs}/create`}
                variant='default'
                size='lg'
              >
                Create Club
              </Button>
              <Button
                as='a'
                href='https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/clubs'
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
            <Heading as='h1' color='primary.900' size='4xl' fontWeight='black'>
              Create
            </Heading>
            <Text
              color='light.500'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '3xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Turn your community into a powerful Web3 Club.
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
            <Heading as='h1' color='primary.900' size='4xl' fontWeight='black'>
              Deposit
            </Heading>
            <Text
              color='light.500'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '3xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Members fund the Club and get voting power.
            </Text>
            <Text
              color='gray'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Send members a Club link to deposit and receive governance tokens
              which provide voting power equal to their pro-rata share of the
              treasury.
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
            <Heading as='h1' color='primary.900' size='4xl' fontWeight='black'>
              Take Action
            </Heading>
            <Text
              color='light.500'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '3xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Transfer funds, buy and sell assets, add members, and more.
              Together.
            </Text>
            <Text
              color='gray'
              fontWeight='light'
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              maxW='6xl'
              letterSpacing='tight'
            >
              Submit proposals, vote, and collectively take action—all
              programmatically. Never rely on a centralized group of actors for
              on-chain activity.
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
                <Icon as={feature.icon} boxSize='10' color='primary.500' />
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
