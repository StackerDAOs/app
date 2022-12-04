import React from 'react';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Circle,
  FormControl,
  FormHelperText,
  FormLabel,
  Flex,
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
import { DeployCoreButton } from 'ui/components/buttons';
import { InfoIcon } from 'ui/components/icons';
import { shortenAddress, validateStacksAddress } from '@stacks-os/utils';
import { nameToSlug, nameToSymbol } from 'utils';
import { includes, size } from 'lodash';
import { LaunchLayout } from '../components/layout';
import { useSteps } from 'ui/store';
import {
  CreateClub,
  CreateFundraising,
  CreateGovernanceToken,
  CreateMembershipPass,
  CreateSubmission,
  CreateVault,
  CreateVoting,
} from '@components/onboarding';
import { Step } from 'ui/components/feedback';
import { Wrapper } from '@components/containers';
import { Notification } from '@components/feedback';
import { useGlobalState } from 'store';

export default function Test() {
  const { stxAddress } = useAccount();
  const router = useRouter();
  const numberOfSteps = 3;
  const { currentStep, setStep } = useSteps();
  console.log({ currentStep });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // goToNextStep();
  };

  // const addMember = () => {
  //   if (includes(club.members, getValues('member'))) {
  //     return;
  //   }
  //   setClub({ ...club, members: club?.members?.concat(getValues('member')) });
  //   setValue('member', '');
  // };

  // const removeMember = (address: string) => {
  //   setClub({
  //     ...club,
  //     members: club?.members?.filter((member) => member !== address),
  //   });
  //   setValue('member', '');
  // };

  // const handleOnFinish = () => {
  //   router.push(`/${nameToSlug(club?.name)}/start`);
  // };

  // const config = {
  //   description: club?.description,
  //   tokenSymbol: nameToSymbol(club?.name),
  //   nftMembershipPass: `${nameToSymbol(club?.name)} Membership Pass`,
  //   memberAddresses: club?.members,
  //   durationInDays: club?.durationInDays,
  //   minimumDeposit: club?.minimumDeposit,
  // };

  // const Step2 = (
  //   <form
  //     onSubmit={handleSubmit((data: any) => {
  //       setStep(currentStep + 1);
  //       setClub({
  //         ...club,
  //         minimumDeposit: data.minimumDeposit,
  //         durationInDays: data.durationInDays,
  //       });
  //     })}
  //   >
  //     <Container maxW='3xl'>
  //       <SectionHeader justify='flex-start' align='center' color='white'>
  //         <Stack spacing='2'>
  //           <HStack spacing='3'>
  //             <Stack
  //               width='40px'
  //               height='40px'
  //               borderRadius='lg'
  //               borderColor='dark.500'
  //               borderWidth='1px'
  //               fontWeight='black'
  //               justify='center'
  //               align='center'
  //               bg='light.900'
  //             >
  //               <Text color='dark.500' fontWeight='bold' fontSize='xl'>
  //                 2
  //               </Text>
  //             </Stack>
  //             <Heading
  //               size='2xl'
  //               fontWeight='black'
  //               lineHeight='1.5'
  //               letterSpacing='tight'
  //               color='white'
  //             >
  //               Club{' '}
  //               <Text
  //                 as='span'
  //                 maxW='2xl'
  //                 mx='auto'
  //                 color='light.500'
  //                 fontWeight='thin'
  //               >
  //                 Details
  //               </Text>
  //             </Heading>
  //           </HStack>
  //           <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
  //             Your club will be able to open additional funding rounds later.
  //           </Text>
  //         </Stack>
  //       </SectionHeader>
  //       <Stack spacing='8'>
  //         <Grid templateColumns='repeat(5, 1fr)' gap='8'>
  //           <GridItem colSpan={4}>
  //             <FormControl>
  //               <FormLabel
  //                 htmlFor='minimumDeposit'
  //                 fontWeight='light'
  //                 color='gray'
  //               >
  //                 Minimum deposit
  //               </FormLabel>
  //               <Controller
  //                 control={control}
  //                 name='minimumDeposit'
  //                 render={({ field: { onChange, value } }) => (
  //                   <Select
  //                     defaultValue={value}
  //                     value={value}
  //                     size='lg'
  //                     color='white'
  //                     bg='dark.700'
  //                     borderColor='rgba(240, 246, 252, 0.1)'
  //                     onChange={onChange}
  //                   >
  //                     <option value='0'>0 STX</option>
  //                     <option value='100'>100 STX</option>
  //                     <option value='500'>500 STX</option>
  //                     <option value='1000'>1,000 STX</option>
  //                     <option value='10000'>10,000 STX</option>
  //                   </Select>
  //                 )}
  //               />
  //               <FormHelperText fontWeight='light' color='gray'>
  //                 Lowest acceptable deposit.
  //               </FormHelperText>
  //             </FormControl>
  //           </GridItem>
  //           <GridItem>
  //             <FormControl>
  //               <FormLabel
  //                 htmlFor='durationInDays'
  //                 fontWeight='light'
  //                 color='gray'
  //               >
  //                 Fundraising duration
  //               </FormLabel>
  //               <Controller
  //                 control={control}
  //                 name='durationInDays'
  //                 render={({ field: { onChange, value } }) => (
  //                   <RadioButtonGroup
  //                     defaultValue='1'
  //                     size='lg'
  //                     onChange={onChange}
  //                     value={value}
  //                   >
  //                     <RadioButton value='1'>1 day</RadioButton>
  //                     <RadioButton value='7'>1 week</RadioButton>
  //                     <RadioButton value='14'>2 weeks</RadioButton>
  //                     <RadioButton value='30'>1 month</RadioButton>
  //                   </RadioButtonGroup>
  //                 )}
  //               />
  //               <FormHelperText fontWeight='light' color='gray'>
  //                 Once the club is deployed, this duration cannot be changed.
  //               </FormHelperText>
  //             </FormControl>
  //           </GridItem>
  //         </Grid>
  //         <Stack justify='space-between' direction='row'>
  //           <Button size='lg' variant='link' onClick={handleGoBack}>
  //             Back
  //           </Button>
  //           <Button size='lg' variant='default' isLoading={false} type='submit'>
  //             Continue
  //           </Button>
  //         </Stack>
  //       </Stack>
  //     </Container>
  //   </form>
  // );

  // const Step3 = (
  //   <form
  //     onSubmit={handleSubmit((data: any) => {
  //       setStep(currentStep + 1);
  //       console.log({ data });
  //     })}
  //   >
  //     <Container maxW='3xl'>
  //       <SectionHeader justify='flex-start' align='center' color='white'>
  //         <Stack spacing='2'>
  //           <HStack spacing='3'>
  //             <Stack
  //               width='40px'
  //               height='40px'
  //               borderRadius='lg'
  //               borderColor='dark.500'
  //               borderWidth='1px'
  //               fontWeight='black'
  //               justify='center'
  //               align='center'
  //               bg='light.900'
  //             >
  //               <Text color='dark.500' fontWeight='bold' fontSize='xl'>
  //                 3
  //               </Text>
  //             </Stack>
  //             <Heading
  //               size='2xl'
  //               fontWeight='black'
  //               lineHeight='1.5'
  //               letterSpacing='tight'
  //               color='white'
  //             >
  //               Add{' '}
  //               <Text
  //                 as='span'
  //                 maxW='2xl'
  //                 mx='auto'
  //                 color='light.500'
  //                 fontWeight='thin'
  //               >
  //                 Members
  //               </Text>
  //             </Heading>
  //           </HStack>
  //           <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
  //             Add members who will receive a Club Membership NFT and access to
  //             participate in {club?.name}.
  //           </Text>
  //         </Stack>
  //       </SectionHeader>
  //       <HStack spacing={4}>
  //         <SimpleGrid columns={4} spacing={4} mb='2'>
  //           {club?.members?.map((member) => (
  //             <Tag
  //               key={member}
  //               size='lg'
  //               borderRadius='full'
  //               variant='dark'
  //               onClick={() => removeMember(member)}
  //             >
  //               <TagLabel>{member && shortenAddress(member)}</TagLabel>
  //               <TagCloseButton />
  //             </Tag>
  //           ))}
  //         </SimpleGrid>
  //       </HStack>
  //       <Stack spacing='8'>
  //         <Grid templateColumns='repeat(5, 1fr)' gap='8'>
  //           <GridItem colSpan={5}>
  //             <FormControl>
  //               <FormLabel htmlFor='address' fontWeight='light' color='gray'>
  //                 Member address
  //               </FormLabel>
  //               <Controller
  //                 control={control}
  //                 name='member'
  //                 render={({ field: { value }, fieldState }) => (
  //                   <InputGroup>
  //                     <Input
  //                       id='address'
  //                       autoComplete='off'
  //                       placeholder='SP14...E4BF'
  //                       size='lg'
  //                       value={value}
  //                       {...register('member', {
  //                         required: false,
  //                         validate: {
  //                           validateStacksAddress: () => {
  //                             if (!value) {
  //                               return true;
  //                             }
  //                             const isValid = validateStacksAddress(value);
  //                             if (isValid) {
  //                               return true;
  //                             }
  //                             return false;
  //                           },
  //                         },
  //                       })}
  //                     />
  //                     <InputRightElement width='4.5rem'>
  //                       <Button
  //                         size='md'
  //                         variant='default'
  //                         position='relative'
  //                         top='1'
  //                         onClick={
  //                           !fieldState.error
  //                             ? addMember
  //                             : () => console.log('invalid')
  //                         }
  //                         isDisabled={value === '' || !!fieldState.error}
  //                       >
  //                         Add
  //                       </Button>
  //                     </InputRightElement>
  //                   </InputGroup>
  //                 )}
  //               />

  //               {errors?.member?.message ? (
  //                 <FormHelperText color='red' fontWeight='light'>
  //                   {errors.member.message}
  //                 </FormHelperText>
  //               ) : (
  //                 <FormHelperText fontWeight='light' color='gray'>
  //                   Add additional STX addresses to your Club.
  //                 </FormHelperText>
  //               )}
  //             </FormControl>
  //           </GridItem>
  //         </Grid>

  //         <Stack justify='space-between' direction='row'>
  //           <Button size='lg' variant='link' onClick={handleGoBack}>
  //             Back
  //           </Button>
  //           <Button
  //             size='lg'
  //             variant='default'
  //             isLoading={false}
  //             type='submit'
  //             isDisabled={club?.members?.length === 1}
  //           >
  //             Continue
  //           </Button>
  //         </Stack>
  //       </Stack>
  //     </Container>
  //   </form>
  // );

  // const Step4 = (
  // <form
  //   onSubmit={handleSubmit(() => {
  //     setStep(currentStep + 1);
  //   })}
  // >
  //     <Container maxW='3xl'>
  //       <SectionHeader justify='flex-start' align='center' color='white'>
  //         <Stack spacing='2'>
  //           <HStack spacing='3'>
  //             <Stack
  //               width='40px'
  //               height='40px'
  //               borderRadius='lg'
  //               borderColor='dark.500'
  //               borderWidth='1px'
  //               fontWeight='black'
  //               justify='center'
  //               align='center'
  //               bg='light.900'
  //             >
  //               <Text color='dark.500' fontWeight='bold' fontSize='xl'>
  //                 4
  //               </Text>
  //             </Stack>
  //             <Heading
  //               size='2xl'
  //               fontWeight='black'
  //               lineHeight='1.5'
  //               letterSpacing='tight'
  //               color='white'
  //             >
  //               Review &amp;{' '}
  //               <Text
  //                 as='span'
  //                 maxW='2xl'
  //                 mx='auto'
  //                 color='light.500'
  //                 fontWeight='thin'
  //               >
  //                 Deploy
  //               </Text>
  //             </Heading>
  //           </HStack>
  //           <Text fontSize='lg' maxW='xl' mx='auto' color='white'>
  //             A core contract is required to manage your extensions. You can
  //             edit the configuration below in the next steps.
  //           </Text>
  //         </Stack>
  //       </SectionHeader>
  //       <Stack spacing='8'>
  //         <Stack py={{ base: '3', md: '3' }} spacing='2'>
  //           <SimpleGrid columns={2} spacing='4'>
  //             <Stack align='flex-start' spacing='0'>
  //               <Text fontSize='lg' fontWeight='light' color='gray'>
  //                 Club name
  //               </Text>
  //               <Text fontSize='2xl' fontWeight='black' color='white'>
  //                 {club?.name}
  //               </Text>
  //             </Stack>
  //             <Stack align='flex-start' spacing='0'>
  //               <HStack>
  //                 <Text fontSize='lg' fontWeight='light' color='gray'>
  //                   Total members
  //                 </Text>
  //                 <Icon as={InfoIcon} color='gray' onClick={onInfoOpen} />
  //               </HStack>
  //               <Text fontSize='2xl' fontWeight='black' color='white'>
  //                 {size(club?.members) || 3}
  //               </Text>
  //             </Stack>
  //             <Stack align='flex-start' spacing='0'>
  //               <Text fontSize='lg' fontWeight='light' color='gray'>
  //                 Open to deposits for
  //               </Text>
  //               <Text fontSize='2xl' fontWeight='black' color='white'>
  //                 ~ {club?.durationInDays} days
  //               </Text>
  //             </Stack>

  //             <Stack align='flex-start' spacing='0'>
  //               <Text fontSize='lg' fontWeight='light' color='gray'>
  //                 Minimum deposit
  //               </Text>
  //               <Text fontSize='2xl' fontWeight='black' color='white'>
  //                 {club?.minimumDeposit} STX
  //               </Text>
  //             </Stack>
  //           </SimpleGrid>
  //         </Stack>
  //         <Stack justify='space-between' direction='row'>
  //           <Button
  //             size='lg'
  //             variant='link'
  //             onClick={handleGoBack}
  //             isLoading={false}
  //             type='submit'
  //           >
  //             Back
  //           </Button>
  //           <DeployCoreButton
  //             title='Create Club'
  //             name={club?.name}
  //             slug={nameToSlug(club?.name)}
  //             config={config}
  //             size='lg'
  //             variant='primary'
  //             isLoading={false}
  //             onDeploy={handleOnFinish}
  //           />
  //         </Stack>
  //       </Stack>
  //       <Modal isOpen={isInfoOpen} onClose={onInfoClose} isCentered>
  //         <ModalOverlay />
  //         <ModalContent bg='dark.900' borderColor='dark.500' borderWidth='1px'>
  //           <ModalBody>
  //             <Stack
  //               px={{ base: '6', md: '6' }}
  //               py={{ base: '6', md: '6' }}
  //               spacing='2'
  //               align='center'
  //             >
  //               <Circle bg='dark.500' size='14' mb='3'>
  //                 <Icon as={InfoIcon} boxSize='8' color='primary.900' />
  //               </Circle>
  //               <Stack spacing='3'>
  //                 <Heading mt='0 !important' size='md' fontWeight='medium'>
  //                   Members
  //                 </Heading>
  //               </Stack>
  //               <Stack spacing='2'>
  //                 {club?.members?.map((address) => (
  //                   <Text
  //                     fontSize='md'
  //                     fontWeight='regular'
  //                     color='text-muted'
  //                     textAlign='center'
  //                   >
  //                     {address}
  //                   </Text>
  //                 ))}
  //               </Stack>
  //             </Stack>
  //           </ModalBody>
  //         </ModalContent>
  //       </Modal>
  //     </Container>
  //   </form>
  // );

  // const renderStep = (step: number) => {
  //   if (step === 0) {
  //     return Step1 as JSX.Element;
  //   }
  //   if (step === 1) {
  //     return Step2 as JSX.Element;
  //   }
  //   if (step === 2) {
  //     return Step3 as JSX.Element;
  //   }
  //   if (step === 3) {
  //     return Step4 as JSX.Element;
  //   }
  //   return Step1 as JSX.Element;
  // };

  const CurrentStep = ({ stepIndex }: { stepIndex: number }) => {
    switch (stepIndex) {
      case 0:
        return <CreateClub />;
      case 1:
        return <CreateMembershipPass />;
      case 2:
        return <CreateGovernanceToken />;
      case 3:
        return <CreateVault />;
      case 4:
        return <CreateFundraising />;
      case 5:
        return <CreateSubmission />;
      case 6:
        return <CreateVoting />;
      default:
        return <CreateClub />;
    }
  };

  return (
    <Box h='100vh'>
      <form onSubmit={onSubmit}>
        <CurrentStep stepIndex={currentStep} />
      </form>
    </Box>
  );
}

Test.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;