import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container } from 'ui/components/layout';
import { MainLayout } from '@components/layout';
import { RocketLaunch, UserGroup, Cog6Tooth } from 'ui/components/icons';
import { CardGrid, FeatureList, BottomHero, TopHero } from '@components/nate';

const sampleText = (
  <Box flex='1' maxW={{ lg: 'lg' }} p='6'>
    <Heading as='h1' size='3xl' mt='8' fontWeight='black'>
      Teams
    </Heading>
    <Text color='gray' mt='5' fontSize='xl'>
      Primitive for groups, companies, nonprofits, subDAOs, and early DAOs to
      manage resources and smart contracts.
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

const topHeroProps = {
  title: 'StackerDAO Teams',
  description:
    'Primitive for groups, companies, nonprofits, subDAOs, and early DAOs to manage resources and smart contracts.',
  link: '/create',
  linkText: 'Coming soon',
};

const cardGridProps = [
  sampleText,
  sampleImage,
  sampleImage,
  sampleText,
  sampleText,
];

const featureListProps = [
  {
    name: 'Feature 1',
    description: 'This is the feature description',
    icon: Cog6Tooth,
  },
  {
    name: 'Feature 2',
    description: 'This is the feature description',
    icon: UserGroup,
  },
  {
    name: 'Feature 3',
    description: 'This is the feature description',
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
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
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
    </motion.div>
  );
}

Teams.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
