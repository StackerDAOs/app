import React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { useSteps, useLaunchForm } from 'ui/store';
import { LaunchLayout } from '../components/layout';

export default function Review() {
  const router = useRouter();
  const { currentStep, setStep } = useSteps();
  const { clubInfo, clubDetails } = useLaunchForm();

  const handleGoBack = () => {
    setStep(currentStep - 1);
    router.push('/add-members');
  };

  React.useEffect(() => {
    setStep(3);
  }, []);

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.8, type: 'linear' }}
    >
      <Stack display='flex' justify='center' h='calc(100vh - 10px)'>
        <Container maxW='3xl'>
          <SectionHeader justify='flex-start' align='center' color='white'>
            <Stack spacing='2'>
              <HStack spacing='2'>
                <Stack
                  width='35px'
                  height='35px'
                  borderRadius='25%'
                  fontWeight='bold'
                  justify='center'
                  align='center'
                  bgGradient='linear(to-br, #50DDC3, #624AF2)'
                >
                  <Text color='white' fontWeight='bold' fontSize='lg'>
                    4
                  </Text>
                </Stack>
                <Heading
                  size='lg'
                  fontWeight='extrabold'
                  lineHeight='1.5'
                  letterSpacing='tight'
                  color='white'
                >
                  Review{' '}
                  <Text as='span' maxW='xl' mx='auto' color='gray'>
                    &amp; Deploy
                  </Text>
                </Heading>
              </HStack>
              <Text fontSize='md' maxW='xl' mx='auto' color='white'>
                Time to review your Club and deploy it to the world!
              </Text>
            </Stack>
          </SectionHeader>
          <Stack spacing='8'>
            <Tabs variant='unstyled' size='md' orientation='vertical'>
              <Grid templateColumns='repeat(6, 1fr)' gap='8'>
                <GridItem colSpan={2}>
                  <TabList>
                    <Tab pl='0' justifyContent='flex-start'>
                      <HStack spacing='4'>
                        <Stack align='flex-start' spacing='1' textAlign='left'>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            Investment Club
                          </Text>
                          <Text fontSize='sm' color='gray'>
                            General club info and details.
                          </Text>
                        </Stack>
                      </HStack>
                    </Tab>
                    <Tab pl='0' justifyContent='flex-start'>
                      <HStack spacing='4'>
                        <Stack align='flex-start' spacing='1' textAlign='left'>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            Membership
                          </Text>
                          <Text fontSize='sm' color='gray'>
                            Club Membership NFT and Governance Token.
                          </Text>
                        </Stack>
                      </HStack>
                    </Tab>
                    <Tab pl='0' justifyContent='flex-start'>
                      <HStack spacing='4'>
                        <Stack align='flex-start' spacing='1' textAlign='left'>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            DAO Extensions
                          </Text>
                          <Text fontSize='sm' color='gray'>
                            Deploy contracts required for managing your Club.
                          </Text>
                        </Stack>
                      </HStack>
                    </Tab>
                  </TabList>
                </GridItem>
                <GridItem colSpan={4}>
                  <TabPanels h='30vh'>
                    <TabPanel>
                      <SimpleGrid columns={2} spacing='4'>
                        <Stack align='flex-start' spacing='0'>
                          <Text fontSize='sm' color='gray'>
                            Name
                          </Text>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            {clubInfo?.name}
                          </Text>
                        </Stack>
                        <Stack align='flex-start' spacing='0'>
                          <Text fontSize='sm' color='gray'>
                            Open to deposits for
                          </Text>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            ~ {clubDetails?.duration} days
                          </Text>
                        </Stack>
                        <Stack align='flex-start' spacing='0'>
                          <Text fontSize='sm' color='gray'>
                            Total members
                          </Text>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            {clubInfo?.totalMembers}
                          </Text>
                        </Stack>
                        <Stack align='flex-start' spacing='0'>
                          <Text fontSize='sm' color='gray'>
                            Signer threshold
                          </Text>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            {clubInfo?.threshold}
                          </Text>
                        </Stack>
                        <Stack align='flex-start' spacing='0'>
                          <Text fontSize='sm' color='gray'>
                            Minimum deposit
                          </Text>
                          <Text fontSize='md' fontWeight='bold' color='white'>
                            {clubDetails?.minimum} STX
                          </Text>
                        </Stack>
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                      <Heading
                        size='xl'
                        fontWeight='light'
                        letterSpacing='tight'
                        color='white'
                      >
                        Investment Clubs powered by
                        <Text
                          color='blue'
                          fontWeight='black'
                          fontSize='8xl'
                          bgGradient='linear(to-br, #F2A900 15%, #FFC431 50%)'
                          bgClip='text'
                        >
                          Bitcoin
                        </Text>
                      </Heading>
                      <Text fontSize='lg' fontWeight='light' color='gray'>
                        Launch an investment club in
                      </Text>
                    </TabPanel>
                    <TabPanel>
                      <Heading
                        size='2xl'
                        fontWeight='light'
                        letterSpacing='tight'
                        color='white'
                      >
                        Investment Clubs powered by
                        <Text
                          color='blue'
                          fontWeight='black'
                          fontSize='8xl'
                          bgGradient='linear(to-br, #F2A900 15%, #FFC431 50%)'
                          bgClip='text'
                        >
                          Bitcoin
                        </Text>
                      </Heading>
                      <Text fontSize='lg' fontWeight='light' color='gray'>
                        Launch an investment club in a few clicks for just the
                        cost of gas. Creating an investing DAO has never been
                        easier.
                      </Text>
                    </TabPanel>
                  </TabPanels>
                </GridItem>
              </Grid>
            </Tabs>
            <Stack justify='space-between' direction='row'>
              <Button
                size='lg'
                variant='link'
                onClick={handleGoBack}
                isLoading={false}
                type='submit'
              >
                Back
              </Button>
              <Button size='lg' variant='primary' isLoading={false} isDisabled>
                View dashboard
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </motion.div>
  );
}

Review.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
