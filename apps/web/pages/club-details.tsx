import React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Select,
  Stack,
  Text,
} from 'ui';
import { useForm, Controller, useFormPersist } from 'ui/components';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { useSteps, useLaunchForm } from 'ui/store';
import { RadioButtonGroup, RadioButton } from 'ui/components/forms';
import { LaunchLayout } from '../components/layout';

export default function ClubDetails() {
  const router = useRouter();
  const { currentStep, setStep } = useSteps();
  const { updateClub } = useLaunchForm();
  const { handleSubmit, watch, setValue, control } = useForm();

  useFormPersist('club-details', { watch, setValue });

  const onSubmit = (data: any) => {
    setStep(currentStep + 1);
    updateClub(data, 'clubDetails');
    router.push('/add-members');
  };

  const handleGoBack = () => {
    setStep(currentStep - 1);
    router.push('/create');
  };

  React.useEffect(() => {
    setStep(1);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.8, type: 'linear' }}
      >
        <Stack
          display='flex'
          justify='center'
          h='calc(100vh - 7px)'
          backgroundImage='radial-gradient(#2e3336 0.75px, transparent 0.75px), radial-gradient(#2e3336 0.75px, #111111 0.75px)'
          backgroundSize='30px 30px'
          backgroundPosition='0 0, 15px 15px'
        >
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
                    bg='bg-primary'
                  >
                    <Text color='white' fontWeight='bold' fontSize='lg'>
                      2
                    </Text>
                  </Stack>
                  <Heading
                    size='lg'
                    fontWeight='extrabold'
                    lineHeight='1.5'
                    letterSpacing='tight'
                    color='white'
                  >
                    Club{' '}
                    <Text as='span' maxW='xl' mx='auto' color='gray'>
                      Details
                    </Text>
                  </Heading>
                </HStack>
                <Text fontSize='md' maxW='xl' mx='auto' color='white'>
                  Your club will be able to open additional funding rounds
                  later.
                </Text>
              </Stack>
            </SectionHeader>
            <Stack spacing='8'>
              <Grid templateColumns='repeat(5, 1fr)' gap='8'>
                <GridItem colSpan={4}>
                  <FormControl>
                    <FormLabel htmlFor='minimum'>Minimum deposit</FormLabel>
                    <Controller
                      control={control}
                      name='minimum'
                      render={({ field: { onChange, value } }) => (
                        <Select
                          defaultValue={value}
                          value={value}
                          size='lg'
                          color='white'
                          bg='dark.700'
                          borderColor='rgba(240, 246, 252, 0.1)'
                          onChange={onChange}
                        >
                          <option value='0'>0 STX</option>
                          <option value='100'>100 STX</option>
                          <option value='500'>500 STX</option>
                          <option value='1000'>1,000 STX</option>
                          <option value='10000'>10,000 STX</option>
                        </Select>
                      )}
                    />
                    <FormHelperText>Lowest acceptable deposit.</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel htmlFor='duration'>
                      Fundraising duration
                    </FormLabel>
                    <Controller
                      control={control}
                      name='duration'
                      render={({ field: { onChange, value } }) => (
                        <RadioButtonGroup
                          defaultValue='7'
                          size='lg'
                          onChange={onChange}
                          value={value}
                        >
                          <RadioButton value='7'>1 week</RadioButton>
                          <RadioButton value='14'>2 weeks</RadioButton>
                          <RadioButton value='30'>1 month</RadioButton>
                          <RadioButton value='90'>3 months</RadioButton>
                        </RadioButtonGroup>
                      )}
                    />
                    <FormHelperText>
                      Once the club is deployed, this duration cannot be
                      changed.
                    </FormHelperText>
                  </FormControl>
                </GridItem>
              </Grid>
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
                <Button
                  size='lg'
                  variant='default'
                  isLoading={false}
                  type='submit'
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </form>
  );
}

ClubDetails.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
