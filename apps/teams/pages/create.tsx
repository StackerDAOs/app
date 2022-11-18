import React from 'react';
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
  ModalOverlay,
  Select,
  Stack,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { RadioButtonGroup, RadioButton } from 'ui/components/forms';
import { useForm, Controller, useAccount } from 'ui/components';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { useSteps } from 'ui/store';
import { DeployTeamButton } from 'ui/components/buttons';
import { InfoIcon } from 'ui/components/icons';
import { shortenAddress, validateStacksAddress } from '@stacks-os/utils';
import { nameToSlug, nameToSymbol } from 'utils';
import { includes, size } from 'lodash';
import { LaunchLayout } from '../components/layout';

interface TeamProps {
  name: string;
  description: string;
  members: string[];
}

export default function Create() {
  const { stxAddress } = useAccount();
  const router = useRouter();
  const [team, setTeam] = React.useState<TeamProps>({
    name: '',
    description: '',
    members: [stxAddress as string],
  });
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();
  const { currentStep, setStep } = useSteps();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      member: '',
    },
  });

  React.useEffect(() => {
    setStep(0);
  }, []);

  const addMember = () => {
    if (includes(team.members, getValues('member'))) {
      return;
    }
    setTeam({ ...team, members: team?.members?.concat(getValues('member')) });
    setValue('member', '');
  };

  const removeMember = (address: string) => {
    setTeam({
      ...team,
      members: team?.members?.filter((member) => member !== address),
    });
    setValue('member', '');
  };

  const handleGoBack = (e: any) => {
    setStep(currentStep - 1);
    e.preventDefault();
  };

  const handleOnFinish = () => {
    router.push(`/${nameToSlug(team?.name)}/start`);
  };

  const config = {
    description: team?.description,
    tokenSymbol: nameToSymbol(team?.name),
    nftMembershipPass: `${nameToSymbol(team?.name)} Membership Pass`,
    memberAddresses: team?.members,
  };

  const Step1 = (
    <form
      onSubmit={handleSubmit((data: any) => {
        setStep(currentStep + 1);
        setTeam({
          ...team,
          name: data.name,
          description: data.description,
        });
      })}
    >
      <Container maxW='3xl'>
        <SectionHeader justify='flex-start' align='center' color='white'>
          <Stack spacing='2'>
            <HStack spacing='3' align='center'>
              <Stack
                width='40px'
                height='40px'
                borderRadius='lg'
                borderColor='dark.500'
                borderWidth='1px'
                fontWeight='black'
                justify='center'
                align='center'
                bg='light.900'
              >
                <Text color='dark.500' fontWeight='bold' fontSize='xl'>
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
                  color='light.500'
                  fontWeight='thin'
                >
                  Team
                </Text>
              </Heading>
            </HStack>
            <Text fontSize='lg' maxW='xl' mx='auto'>
              Your team name will be used to generate a unique URL for your
              members to join and manage funds.
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
                    color='secondary.900'
                    fontSize='sm'
                    fontWeight='light'
                  >
                    {errors.name.message}
                  </FormHelperText>
                ) : (
                  <FormHelperText fontWeight='light' color='gray'>
                    Easily identifyable name for your team.
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel
                  htmlFor='description'
                  fontWeight='light'
                  color='gray'
                >
                  Description
                </FormLabel>
                <Textarea
                  id='description'
                  autoComplete='off'
                  placeholder='Description about your team that will be visible on your teams dashboard.'
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
                  Describe what your team will be used for. This will be on your
                  teams dashboard.
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
    </form>
  );

  const Step2 = (
    <form
      onSubmit={handleSubmit((data: any) => {
        setStep(currentStep + 1);
        console.log({ data });
      })}
    >
      <Container maxW='3xl'>
        <SectionHeader justify='flex-start' align='center' color='white'>
          <Stack spacing='2'>
            <HStack spacing='3'>
              <Stack
                width='40px'
                height='40px'
                borderRadius='lg'
                borderColor='dark.500'
                borderWidth='1px'
                fontWeight='black'
                justify='center'
                align='center'
                bg='light.900'
              >
                <Text color='dark.500' fontWeight='bold' fontSize='xl'>
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
                Add{' '}
                <Text
                  as='span'
                  maxW='2xl'
                  mx='auto'
                  color='light.500'
                  fontWeight='thin'
                >
                  Members
                </Text>
              </Heading>
            </HStack>
            <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
              Add members to {team?.name}.
            </Text>
          </Stack>
        </SectionHeader>
        <HStack spacing={4}>
          <SimpleGrid columns={4} spacing={4} mb='2'>
            {team?.members?.map((member: any) => (
              <Tag
                key={member}
                size='lg'
                borderRadius='full'
                variant='dark'
                onClick={() => removeMember(member)}
              >
                <TagLabel>{member && shortenAddress(member)}</TagLabel>
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
                  name='member'
                  render={({ field: { value }, fieldState }) => (
                    <InputGroup>
                      <Input
                        id='address'
                        autoComplete='off'
                        placeholder='SP14...E4BF'
                        size='lg'
                        value={value}
                        {...register('member', {
                          required: false,
                          validate: {
                            validateStacksAddress: () => {
                              if (!value) {
                                return true;
                              }
                              const isValid = validateStacksAddress(value);
                              if (isValid) {
                                return true;
                              }
                              return false;
                            },
                          },
                        })}
                      />
                      <InputRightElement width='4.5rem'>
                        <Button
                          size='md'
                          variant='default'
                          position='relative'
                          top='1'
                          onClick={
                            !fieldState.error
                              ? addMember
                              : () => console.log('invalid')
                          }
                          isDisabled={value === '' || !!fieldState.error}
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
                    Add additional STX addresses to your Team.
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>
          </Grid>

          <Stack justify='space-between' direction='row'>
            <Button size='lg' variant='link' onClick={handleGoBack}>
              Back
            </Button>
            <Button
              size='lg'
              variant='default'
              isLoading={false}
              type='submit'
              isDisabled={team?.members?.length === 1}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </Container>
    </form>
  );

  const Step3 = (
    <form
      onSubmit={handleSubmit(() => {
        setStep(currentStep + 1);
      })}
    >
      <Container maxW='3xl'>
        <SectionHeader justify='flex-start' align='center' color='white'>
          <Stack spacing='2'>
            <HStack spacing='3'>
              <Stack
                width='40px'
                height='40px'
                borderRadius='lg'
                borderColor='dark.500'
                borderWidth='1px'
                fontWeight='black'
                justify='center'
                align='center'
                bg='light.900'
              >
                <Text color='dark.500' fontWeight='bold' fontSize='xl'>
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
                Review &amp;{' '}
                <Text
                  as='span'
                  maxW='2xl'
                  mx='auto'
                  color='light.500'
                  fontWeight='thin'
                >
                  Deploy
                </Text>
              </Heading>
            </HStack>
            <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
              A core contract is required to manage your extensions. You can
              edit the configuration below in the next steps.
            </Text>
          </Stack>
        </SectionHeader>
        <Stack spacing='8'>
          <Stack py={{ base: '3', md: '3' }} spacing='2'>
            <SimpleGrid columns={2} spacing='4'>
              <Stack align='flex-start' spacing='0'>
                <Text fontSize='lg' fontWeight='light' color='gray'>
                  Team name
                </Text>
                <Text fontSize='2xl' fontWeight='black' color='white'>
                  {team?.name}
                </Text>
              </Stack>
              <Stack align='flex-start' spacing='0'>
                <HStack>
                  <Text fontSize='lg' fontWeight='light' color='gray'>
                    Total members
                  </Text>
                  <Icon as={InfoIcon} color='gray' onClick={onInfoOpen} />
                </HStack>
                <Text fontSize='2xl' fontWeight='black' color='white'>
                  {size(team?.members) || 3}
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
            <DeployTeamButton
              title='Create Team'
              name={team?.name}
              slug={nameToSlug(team?.name)}
              config={config}
              size='lg'
              variant='secondary'
              isLoading={false}
              onDeploy={handleOnFinish}
            />
          </Stack>
        </Stack>
        <Modal isOpen={isInfoOpen} onClose={onInfoClose} isCentered>
          <ModalOverlay />
          <ModalContent bg='dark.900' borderColor='dark.500' borderWidth='1px'>
            <ModalBody>
              <Stack
                px={{ base: '6', md: '6' }}
                py={{ base: '6', md: '6' }}
                spacing='2'
                align='center'
              >
                <Circle bg='dark.500' size='14' mb='3'>
                  <Icon as={InfoIcon} boxSize='8' color='secondary.900' />
                </Circle>
                <Stack spacing='3'>
                  <Heading mt='0 !important' size='md' fontWeight='medium'>
                    Members
                  </Heading>
                </Stack>
                <Stack spacing='2'>
                  {team?.members?.map((address) => (
                    <Text
                      fontSize='md'
                      fontWeight='regular'
                      color='text-muted'
                      textAlign='center'
                    >
                      {address}
                    </Text>
                  ))}
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </form>
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
    return Step1 as JSX.Element;
  };

  return (
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
          backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #121416)'
          opacity='1'
        >
          {renderStep(currentStep)}
        </Stack>
      </Box>
    </motion.div>
  );
}

Create.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
