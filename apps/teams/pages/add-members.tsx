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
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from 'ui';
import { useForm, Controller, useFormPersist } from 'ui/components';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { useSteps, useLaunchForm } from 'ui/store';
import { LaunchLayout } from '../components/layout';

export default function AddMembers() {
  const router = useRouter();
  const { currentStep, setStep } = useSteps();
  const { clubInfo, clubMembers, updateClub } = useLaunchForm();
  const {
    getValues,
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useFormPersist('members', { watch, setValue });

  const onSubmit = (data: any) => {
    console.log({ data });
    router.push('/review');
  };

  const handleGoBack = () => {
    setStep(currentStep - 1);
    router.push('/club-details');
  };

  const addMember = () => {
    updateClub([...clubMembers, getValues('member')], 'clubMembers');
    setValue('member', '');
  };

  React.useEffect(() => {
    setStep(2);
    updateClub(['SP143YHR805B8S834BWJTMZVFR1WP5FFC03WZE4BF'], 'clubMembers');
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
                      3
                    </Text>
                  </Stack>
                  <Heading
                    size='lg'
                    fontWeight='extrabold'
                    lineHeight='1.5'
                    letterSpacing='tight'
                    color='white'
                  >
                    Add{' '}
                    <Text as='span' maxW='xl' mx='auto' color='gray'>
                      Members
                    </Text>
                  </Heading>
                </HStack>
                <Text fontSize='md' maxW='xl' mx='auto' color='white'>
                  Add members who should receive a Club Membership NFT and
                  access to participate in {clubInfo?.name}.
                </Text>
              </Stack>
            </SectionHeader>
            <HStack spacing={4}>
              <SimpleGrid columns={4} spacing={4} mb='2'>
                {clubMembers.map((member) => (
                  <Tag
                    key={member}
                    size='lg'
                    borderRadius='full'
                    variant='dark'
                  >
                    <TagLabel>{member}</TagLabel>
                    <TagCloseButton />
                  </Tag>
                ))}
              </SimpleGrid>
            </HStack>
            <Stack spacing='8'>
              <Grid templateColumns='repeat(5, 1fr)' gap='8'>
                <GridItem colSpan={5}>
                  <FormControl>
                    <FormLabel htmlFor='name'>Member address</FormLabel>
                    <Controller
                      control={control}
                      name='minimum'
                      render={({ field: { value } }) => (
                        <InputGroup>
                          <Input
                            id='member'
                            autoComplete='off'
                            placeholder='SP14...E4BF'
                            size='lg'
                            value={value}
                            {...register('member', {})}
                          />
                          <InputRightElement width='4.5rem'>
                            <Button
                              size='md'
                              variant='default'
                              position='relative'
                              top='1'
                              onClick={addMember}
                            >
                              Add
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      )}
                    />

                    {errors?.member?.message ? (
                      <FormHelperText
                        color='red'
                        fontSize='sm'
                        fontWeight='light'
                      >
                        {errors.member.message}
                      </FormHelperText>
                    ) : (
                      <FormHelperText>
                        Add additional STX addresses to your Club.
                      </FormHelperText>
                    )}
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
                  Continue
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </form>
  );
}

AddMembers.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
