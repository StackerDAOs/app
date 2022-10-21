import Link from 'next/link';
import { Box, Heading, Text, Image, HStack, Stack } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container } from 'ui/components/layout';
import {
  RocketLaunch,
  UserGroup,
  Cog6Tooth,
  LogoIcon,
} from 'ui/components/icons';
import {
  CardGrid,
  FeatureList,
  BottomHero,
  TopHero,
} from '@components/marketing';
import { useScrollPosition } from 'ui/hooks/react';
import { MainNavbar, LandingNavbar, Footer } from '@components/navigation';
import { Nav } from '@components/containers';

// Title of page that will appear next to DAO logo on scroll
const navTitle = 'CLUBS';

// Copy for Top Hero
const topHeroProps = {
  space: 'Clubs',
  primary900: 'primary.900',
  color1: 'linear(to-b, primary.900 65%, dark.500 100%)',
  color2: 'linear(to-b, light.900 25%, primary.900 100%)',
  button: 'Create Club',
  linkColor: 'primary.900',
};

const sampleText1 = (
  <Box flex='1' mx='3'>
    <Heading as='h1' size='3xl' fontWeight='black'>
      1. Create
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Turn your community into a powerful Web3 Club
    </Text>
    <Text color='gray' mt='5' fontSize='xl'>
      In just a few clicks, set up rules, decide who will receive a Club Pass,
      and launch your Club. Club Passes are NFTs that define your Club’s
      membership and enable your Club’s integration with other NFT powered apps.
    </Text>
  </Box>
);

// Card Grid Copy
const sampleText2 = (
  <Box flex='1' mx='3'>
    <Heading as='h1' size='3xl' fontWeight='black'>
      2. Deposit
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Members fund the Club and get voting power.
    </Text>
    <Text color='gray' mt='5' fontSize='xl'>
      Send members a Club link to deposit and receive governance tokens which
      provide voting power equal to their pro-rata share of the treasury.
    </Text>
  </Box>
);

const sampleText3 = (
  <Box flex='1' mx='3'>
    <Heading as='h1' size='3xl' fontWeight='black'>
      3. Take Action
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Transfer funds, buy and sell assets, add members, and more. Together.
    </Text>
    <Text color='gray' mt='5' fontSize='xl'>
      Submit proposals, vote, and collectively take action—all programmatically.{' '}
      Never rely on a centralized group of actors for on-chain activity.
    </Text>
  </Box>
);

const cardGridProps = [sampleText1, sampleText2, sampleText3];

const featureListProps = [
  {
    name: 'Treasury',
    description:
      'Manage fungible tokens and NFTs. Whitelist assets to protect your treasury. View your assets on our dashboard.',
    icon: Cog6Tooth,
  },
  {
    name: 'Proposals & Automatic Execution',
    description:
      'Members can create, deploy, and submit proposals. Proposals are smart contracts—allowing the Club to automatically execute approved proposals for on-chain activity.',
    icon: UserGroup,
  },
  {
    name: 'On-chain Voting',
    description: 'Members that have deposited funds can vote on-chain.',
    icon: RocketLaunch,
  },
  {
    name: 'Temperature Checks',
    description:
      'Members can create Ideas to receive guidance from the rest of the Club through upvotes and downvotes before submitting a formal on-chain proposal—all powered by off-chain authenticated wallet signatures.',
    icon: Cog6Tooth,
  },
  {
    name: 'Composable Extensions',
    description:
      'Buy and sell NFTs, swap tokens, borrow and lend, and more. Extensions provide your Club’s structure and allow it to do almost anything an individual wallet can do.',
    icon: Cog6Tooth,
  },
  {
    name: 'Ragequit',
    description:
      'Members can exit the Club at anytime (or "ragequit") by burning their Club Pass and governance tokens in return for their pro-rata share of liquid STX in the Club’s treasury.',
    icon: Cog6Tooth,
  },
];

const bottomHeroProps = {
  heading: 'Get Started and Deploy Custom Contracts Fast',
  description: "Add Extensions to Meet your Teams's Needs",
};

const bottomHeroImage = (
  <Image
    boxSize='full'
    objectFit='cover'
    src='/images/stxImage.png'
    alt='Screenshot for Stx'
  />
);

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
      <Box as='section'>
        <Nav bg='dark.900'>
          <HStack justify='space-between' h='40px'>
            <Link href='/'>
              <LogoIcon
                alt='logo'
                url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
                cursor='pointer'
                height='35px'
              />
            </Link>
            <Box as='section' w='100%'>
              {scrollPosition < 400 ? (
                <MainNavbar />
              ) : (
                <LandingNavbar navTitle={navTitle} />
              )}
            </Box>
          </HStack>
        </Nav>
      </Box>
      <Box
        backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
        opacity='1'
      >
        <Container h='full' maxW='5xl'>
          <TopHero topHeroProps={topHeroProps} />
          <Stack spacing='20'>
            <CardGrid cardGridProps={cardGridProps} />
            <FeatureList featureListProps={featureListProps} />
          </Stack>
        </Container>
      </Box>
      <Footer />
    </motion.div>
  );
}
