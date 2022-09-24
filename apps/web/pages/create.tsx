import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Circle,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Stack,
  SimpleGrid,
  Spinner,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { RadioButtonGroup, RadioButton } from 'ui/components/forms';
import { useForm, Controller, useFormPersist } from 'ui/components';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { useSteps, useLaunchForm } from 'ui/store';
import { LaunchLayout } from '../components/layout';
import { DeployCoreButton } from 'ui/components/buttons';
import { useTransaction } from 'ui/hooks';
import { LightningBolt } from 'ui/components/icons';
import { Card } from 'ui/components/cards';

export default function Create() {
  const router = useRouter();
  const [transactionId, setTransactionId] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentStep, setStep } = useSteps();
  const { clubInfo, clubDetails, clubMembers, updateClub } = useLaunchForm();
  const { data: transaction } = useTransaction(transactionId);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    setStep(3);
  }, []);

  useFormPersist('club-info', { watch, setValue });

  const onSubmit = (data: any) => {
    setStep(currentStep + 1);
    console.log('running...');
    updateClub(data, 'clubInfo');
  };

  const addMember = () => {
    updateClub([...clubMembers, getValues('member')], 'clubMembers');
    setValue('member', '');
  };

  const handleGoBack = (e: any) => {
    setStep(currentStep - 1);
    e.preventDefault();
  };

  const handleOnFinish = (data: any) => {
    setTransactionId(data.txId);
    onOpen();
  };

  const Step1 = (
    <Container maxW='3xl'>
      <SectionHeader justify='flex-start' align='center' color='white'>
        <Stack spacing='2'>
          <HStack spacing='2'>
            <Stack
              width='40px'
              height='40px'
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
              size='2xl'
              fontWeight='black'
              lineHeight='1.5'
              letterSpacing='tight'
              color='white'
            >
              Create{' '}
              <Text
                as='span'
                maxW='2xl'
                mx='auto'
                color='gray'
                fontWeight='thin'
              >
                Club
              </Text>
            </Heading>
          </HStack>
          <Text fontSize='lg' maxW='xl' mx='auto'>
            Your club name will be used to generate a Club Membership NFT as
            well as a unique URL for your members to join and deposit funds.
          </Text>
        </Stack>
      </SectionHeader>
      <Stack spacing='8'>
        <Grid gap='8'>
          <GridItem colSpan={4}>
            <FormControl>
              <FormLabel htmlFor='name' fontWeight='light' color='gray'>
                Name
              </FormLabel>
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
                  color='primary.900'
                  fontSize='sm'
                  fontWeight='light'
                >
                  {errors.name.message}
                </FormHelperText>
              ) : (
                <FormHelperText fontWeight='light' color='gray'>
                  Easily identifyable name for your club.
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl>
              <FormLabel htmlFor='description' fontWeight='light' color='gray'>
                Description
              </FormLabel>
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
              <FormHelperText fontWeight='light' color='gray'>
                Describe what your club will be used for. This will be on your
                clubs dashboard.
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
  );

  const Step2 = (
    <Container maxW='3xl'>
      <SectionHeader justify='flex-start' align='center' color='white'>
        <Stack spacing='2'>
          <HStack spacing='2'>
            <Stack
              width='40px'
              height='40px'
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
              size='2xl'
              fontWeight='black'
              lineHeight='1.5'
              letterSpacing='tight'
              color='white'
            >
              Club{' '}
              <Text
                as='span'
                maxW='2xl'
                mx='auto'
                color='gray'
                fontWeight='thin'
              >
                Details
              </Text>
            </Heading>
          </HStack>
          <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
            Your club will be able to open additional funding rounds later.
          </Text>
        </Stack>
      </SectionHeader>
      <Stack spacing='8'>
        <Grid templateColumns='repeat(5, 1fr)' gap='8'>
          <GridItem colSpan={4}>
            <FormControl>
              <FormLabel htmlFor='minimum' fontWeight='light' color='gray'>
                Minimum deposit
              </FormLabel>
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
              <FormHelperText fontWeight='light' color='gray'>
                Lowest acceptable deposit.
              </FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor='duration' fontWeight='light' color='gray'>
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
              <FormHelperText fontWeight='light' color='gray'>
                Once the club is deployed, this duration cannot be changed.
              </FormHelperText>
            </FormControl>
          </GridItem>
        </Grid>
        <Stack justify='space-between' direction='row'>
          <Button size='lg' variant='link' onClick={handleGoBack}>
            Back
          </Button>
          <Button size='lg' variant='default' isLoading={false} type='submit'>
            Next
          </Button>
        </Stack>
      </Stack>
    </Container>
  );

  const Step3 = (
    <Container maxW='3xl'>
      <SectionHeader justify='flex-start' align='center' color='white'>
        <Stack spacing='2'>
          <HStack spacing='2'>
            <Stack
              width='40px'
              height='40px'
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
              size='2xl'
              fontWeight='black'
              lineHeight='1.5'
              letterSpacing='tight'
              color='white'
            >
              Add{' '}
              <Text
                as='span'
                maxW='2xl'
                mx='auto'
                color='gray'
                fontWeight='thin'
              >
                Members
              </Text>
            </Heading>
          </HStack>
          <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
            Add members who should receive a Club Membership NFT and access to
            participate in {clubInfo?.name}.
          </Text>
        </Stack>
      </SectionHeader>
      <HStack spacing={4}>
        <SimpleGrid columns={4} spacing={4} mb='2'>
          {clubMembers.map((member) => (
            <Tag key={member} size='lg' borderRadius='full' variant='dark'>
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
              <FormLabel htmlFor='address' fontWeight='light' color='gray'>
                Member address
              </FormLabel>
              <Controller
                control={control}
                name='address'
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
                <FormHelperText color='red' fontWeight='light'>
                  {errors.member.message}
                </FormHelperText>
              ) : (
                <FormHelperText fontWeight='light' color='gray'>
                  Add additional STX addresses to your Club.
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>
        </Grid>

        <Stack justify='space-between' direction='row'>
          <Button size='lg' variant='link' onClick={handleGoBack}>
            Back
          </Button>
          <Button size='lg' variant='default' isLoading={false} type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </Container>
  );

  const Step4 = (
    <Container maxW='3xl'>
      <SectionHeader justify='flex-start' align='center' color='white'>
        <Stack spacing='2'>
          <HStack spacing='2'>
            <Stack
              width='40px'
              height='40px'
              borderRadius='25%'
              fontWeight='bold'
              justify='center'
              align='center'
              bg='bg-primary'
            >
              <Text color='white' fontWeight='bold' fontSize='lg'>
                4
              </Text>
            </Stack>
            <Heading
              size='2xl'
              fontWeight='black'
              lineHeight='1.5'
              letterSpacing='tight'
              color='white'
            >
              Review &amp;{' '}
              <Text
                as='span'
                maxW='2xl'
                mx='auto'
                color='gray'
                fontWeight='thin'
              >
                Deploy
              </Text>
            </Heading>
          </HStack>
          <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
            A core contract is required to manage your extensions. You can edit
            the configuration below in the next steps.
          </Text>
        </Stack>
      </SectionHeader>
      <Stack spacing='8'>
        <Stack py={{ base: '3', md: '3' }} spacing='2'>
          <SimpleGrid columns={2} spacing='4'>
            <Stack align='flex-start' spacing='0'>
              <Text fontSize='lg' fontWeight='light' color='gray'>
                Club name
              </Text>
              <Text fontSize='2xl' fontWeight='black' color='white'>
                {clubInfo?.name}
              </Text>
            </Stack>
            <Stack align='flex-start' spacing='0'>
              <Text fontSize='lg' fontWeight='light' color='gray'>
                Open to deposits for
              </Text>
              <Text fontSize='2xl' fontWeight='black' color='white'>
                ~ {clubDetails?.duration} days
              </Text>
            </Stack>
            <Stack align='flex-start' spacing='0'>
              <Text fontSize='lg' fontWeight='light' color='gray'>
                Total members
              </Text>
              <Text fontSize='2xl' fontWeight='black' color='white'>
                {clubInfo?.totalMembers || 3}
              </Text>
            </Stack>
            <Stack align='flex-start' spacing='0'>
              <Text fontSize='lg' fontWeight='light' color='gray'>
                Minimum deposit
              </Text>
              <Text fontSize='2xl' fontWeight='black' color='white'>
                {clubDetails?.minimum} STX
              </Text>
            </Stack>
          </SimpleGrid>
        </Stack>
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
          <Link href={`/d/${clubInfo?.name}`}>
            <DeployCoreButton
              title='Deploy'
              name='StackerDAO'
              slug='stackerdao'
              size='lg'
              variant='primary'
              isLoading={false}
              onFinish={handleOnFinish}
            />
          </Link>
        </Stack>
      </Stack>
    </Container>
  );

  const renderStep = (step: number) => {
    if (step === 0) {
      return Step1 as JSX.Element;
    }
    if (step === 1) {
      return Step2 as JSX.Element;
    }
    if (step === 2) {
      return Step3 as JSX.Element;
    }
    if (step === 3) {
      return Step4 as JSX.Element;
    }
  };

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
            {renderStep(currentStep)}
          </Stack>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent
              bg='dark.800'
              borderColor='dark.500'
              borderWidth='1px'
            >
              <ModalBody>
                <Stack spacing='0'>
                  {transaction?.tx_status === 'pending' ? (
                    <Stack
                      px={{ base: '6', md: '6' }}
                      py={{ base: '6', md: '6' }}
                      spacing='2'
                      align='center'
                    >
                      <Circle bg='dark.500' size='14' mb='3'>
                        <Icon
                          as={LightningBolt}
                          boxSize='8'
                          color='primary.900'
                        />
                      </Circle>
                      <Stack spacing='3'>
                        <Heading
                          mt='0 !important'
                          size='md'
                          fontWeight='medium'
                        >
                          Your transaction is pending
                        </Heading>
                      </Stack>
                      <Text
                        fontSize='md'
                        fontWeight='thin'
                        color='text-muted'
                        textAlign='center'
                      >
                        Once your transaction is confirmed, your Club dashboard
                        will be available.
                      </Text>
                    </Stack>
                  ) : (
                    <Stack
                      px={{ base: '6', md: '6' }}
                      py={{ base: '6', md: '6' }}
                      spacing='2'
                      align='center'
                    >
                      <Circle bg='dark.500' size='14' mb='3'>
                        <Icon
                          as={LightningBolt}
                          boxSize='8'
                          color='primary.900'
                        />
                      </Circle>
                      <Stack spacing='3'>
                        <Heading
                          mt='0 !important'
                          size='md'
                          fontWeight='medium'
                        >
                          Your transaction is confirmed
                        </Heading>
                      </Stack>
                      <Text
                        fontSize='md'
                        fontWeight='thin'
                        color='text-muted'
                        textAlign='center'
                      >
                        Go to the {clubInfo?.name} Dashboard to finish your club
                        setup.
                      </Text>
                    </Stack>
                  )}
                </Stack>
              </ModalBody>
              <ModalFooter>
                {transaction?.tx_status === 'pending' ? (
                  <Stack>
                    <Button variant='default' isFullWidth>
                      <Spinner size='xs' mr='2' />
                    </Button>
                    <Text
                      fontSize='sm'
                      fontWeight='light'
                      color='text-muted'
                      textAlign='center'
                    >
                      Do not refresh the page or close this window until your
                      transaction is confirmed.
                    </Text>
                  </Stack>
                ) : (
                  <Link href={`/d/${clubInfo?.name}`}>
                    <Button variant='primary' isFullWidth>
                      Go to your dashboard
                    </Button>
                  </Link>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </motion.div>
    </form>
  );
}

Create.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
