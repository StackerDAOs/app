import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from 'ui';
import { useForm, useFormPersist } from 'ui/components';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { useSteps, useLaunchForm } from 'ui/store';
import { LaunchLayout } from '../components/layout';

export default function Create() {
  const router = useRouter();
  const { currentStep, setStep } = useSteps();
  const { updateClub } = useLaunchForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useFormPersist('club-info', { watch, setValue });

  const onSubmit = (data: any) => {
    setStep(currentStep + 1);
    updateClub(data, 'clubInfo');
    router.push('/club-details');
  };

  React.useEffect(() => {
    setStep(0);
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
        <Box h={{ base: '720px' }}>
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
                        1
                      </Text>
                    </Stack>
                    <Heading
                      size='lg'
                      fontWeight='extrabold'
                      lineHeight='1.5'
                      letterSpacing='tight'
                      color='white'
                    >
                      Create{' '}
                      <Text as='span' maxW='xl' mx='auto' color='gray'>
                        Club
                      </Text>
                    </Heading>
                  </HStack>
                  <Text fontSize='md' maxW='xl' mx='auto'>
                    Your club name will be used to generate a Club Membership
                    NFT as well as a unique URL for your members to join and
                    deposit funds.
                  </Text>
                </Stack>
              </SectionHeader>
              <Stack spacing='8'>
                <Grid gap='8'>
                  <GridItem colSpan={4}>
                    <FormControl>
                      <FormLabel htmlFor='name'>Name</FormLabel>
                      <Input
                        id='name'
                        autoComplete='off'
                        placeholder='StackerDAO'
                        size='lg'
                        {...register('name', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4',
                          },
                        })}
                      />
                      {errors?.name?.message ? (
                        <FormHelperText
                          color='red'
                          fontSize='sm'
                          fontWeight='light'
                        >
                          {errors.name.message}
                        </FormHelperText>
                      ) : (
                        <FormHelperText>
                          Easily identifyable name for your club.
                        </FormHelperText>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <FormControl>
                      <FormLabel htmlFor='description'>Description</FormLabel>
                      <Textarea
                        id='description'
                        autoComplete='off'
                        placeholder='Description about your club that will be visible on your club dashboard.'
                        size='lg'
                        {...register('description', {
                          required: 'This is required',
                          minLength: {
                            value: 3,
                            message: 'Minimum length should be 3',
                          },
                        })}
                      />
                      <FormHelperText>
                        Describe what your club will be used for. This will be
                        on your clubs dashboard.
                      </FormHelperText>
                    </FormControl>
                  </GridItem>
                </Grid>
                <Stack>
                  <Button
                    size='lg'
                    isFullWidth
                    variant='default'
                    isLoading={false}
                    type='submit'
                  >
                    Continue
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Stack>
        </Box>
      </motion.div>
    </form>
  );
}

Create.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
