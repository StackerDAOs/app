import React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
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
                  Your Investment Club name will be used to generate a Club
                  Membership NFT, a non-transferrable token, as well as a unique
                  URL for your members to join.
                </Text>
              </Stack>
            </SectionHeader>
            <Stack spacing='8'>
              <Grid templateColumns='repeat(5, 1fr)' gap='8'>
                <GridItem colSpan={3}>
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
                        Easily identifyable name for your Investment Club.
                      </FormHelperText>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel htmlFor='tokenSymbol'>Club token</FormLabel>
                    <Input
                      id='tokenSymbol'
                      autoComplete='off'
                      placeholder='SDAO'
                      size='lg'
                      {...register('tokenSymbol', {
                        required: 'This is required',
                        minLength: {
                          value: 3,
                          message: 'Minimum length should be 3',
                        },
                      })}
                    />
                    <FormHelperText>
                      Symbol for non-transferrable token used for cap table
                      management.
                    </FormHelperText>
                  </FormControl>
                </GridItem>
              </Grid>
              <SimpleGrid columns={2} spacing={5}>
                <FormControl>
                  <FormLabel htmlFor='totalMembers'>Total members</FormLabel>
                  <Input
                    id='totalMembers'
                    autoComplete='off'
                    placeholder='5'
                    size='lg'
                    {...register('totalMembers', {
                      required: 'This is required',
                    })}
                  />
                  <FormHelperText>
                    Max number of members allowed is capped at 99.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='threshold'>Threshold</FormLabel>
                  <Input
                    id='threshold'
                    autoComplete='off'
                    placeholder='3'
                    size='lg'
                    {...register('threshold', {
                      required: 'This is required',
                    })}
                  />
                  <FormHelperText>
                    Member approvals required to make a decision.
                  </FormHelperText>
                </FormControl>
              </SimpleGrid>
              <Stack align='flex-end'>
                <ButtonGroup spacing='3'>
                  <Button
                    size='lg'
                    variant='primary'
                    isLoading={false}
                    type='submit'
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </form>
  );
}

Create.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
