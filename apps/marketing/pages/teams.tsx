import Link from 'next/link';
import { Box, Heading, Text, Image, HStack, Button } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container } from 'ui/components/layout';
import { RocketLaunch, UserGroup, Cog6Tooth } from 'ui/components/icons';
import { CardGrid, FeatureList, BottomHero, TopHero } from '@components/nate';
import { useScrollPosition } from 'ui/hooks/react';
import { MainNavbar, LandingNavbar, Footer } from '@components/navigation';
import { LogoIcon } from 'ui/components/icons';
import { Nav } from '@components/containers';

const sampleText1 = (
  <Box flex='1' maxW={{ md: 'md' }} mx='3'>
    <Heading as='h1' size='3xl' fontWeight='black'>
      Accessible
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Gate access and define membership with NFTs that members receive once your
      club has been deployed.
    </Text>
  </Box>
);

const sampleText2 = (
  <Box flex='1' maxW={{ md: 'md' }} mx='3'>
    <Heading as='h1' size='3xl' fontWeight='black'>
      Collaborate
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Track deposited assets and tokenize participation with fungible tokens
      disbursed to club members. Use tokens to vote on and execute proposals.
    </Text>
  </Box>
);

const sampleText3 = (
  <Box flex='1' maxW={{ md: 'md' }} mx='3'>
    <Heading as='h1' size='3xl' fontWeight='black'>
      Extensible
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Deploy extensions to seemlessly intract with smart contracts across the
      Stacks ecosystem.
    </Text>
  </Box>
);

const sampleText4 = (
  <Box flex='1' maxW={{ md: 'md' }} mx='3'>
    <Heading as='h1' size='3xl' fontWeight='black'>
      Codeless
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Deploy smart contracts that allow to manage your club
    </Text>
  </Box>
);

const sampleImage = (
  <Image
    pos='relative'
    marginEnd={{ base: '0', lg: '-16rem' }}
    w='60rem'
    src='/images/teams.png'
    alt='Screenshot for Form builder'
  />
);

const sampleImage2 = (
  <Image
    boxSize='full'
    objectFit='cover'
    src='/images/stxImage.png'
    alt='Screenshot for Stx'
  />
);

const noImage = <Box />;

const navTitle = 'TEAMS';

const topHeroProps = {
  title: 'StackerDAO Teams',
  description:
    'Primitive for groups, companies, nonprofits, subDAOs, and early DAOs to manage resources and smart contracts.',
  link: '/create',
  linkText: 'Coming soon',
  color: 'blue',
};

const cardGridProps = [
  sampleText1,
  noImage,
  noImage,
  sampleText2,
  sampleText3,
  sampleImage,
  sampleText4,
];

const featureListProps = [
  {
    name: 'Feature 1',
    description: 'Create your club and set fundraising goals.',
    icon: Cog6Tooth,
  },
  {
    name: 'Feature 2',
    description: 'Invite members.',
    icon: UserGroup,
  },
  {
    name: 'Feature 3',
    description: 'Codelessly deploy smart contracts.',
    icon: RocketLaunch,
  },
];

const bottomHeroProps = {
  heading: 'Get Started and Deploy Custom Contracts Fast',
  description: "Add Extensions to Meet your Teams's Needs",
};

const getStartedButton = (
  <Button
    minW='14rem'
    bg='light.900'
    color='dark.500'
    size='lg'
    height='14'
    px='8'
    fontSize='md'
    fontWeight='bold'
  >
    Get Started
  </Button>
);

export default function Teams() {
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
          <Box>
            <CardGrid
              cardGridProps={cardGridProps}
              getStartedButton={getStartedButton}
            />
          </Box>
          <FeatureList
            featureListProps={featureListProps}
            getStartedButton={getStartedButton}
          />
          <BottomHero
            bottomHeroProps={bottomHeroProps}
            getStartedButton={getStartedButton}
            bottomHeroImage={sampleImage2}
          />
        </Container>
      </Box>
      <Footer />
    </motion.div>
  );
}
