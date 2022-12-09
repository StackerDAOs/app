import React from 'react';
import type { ButtonProps } from 'ui';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Image,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Square,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { GearIcon, UpgradeIcon, WalletIcon } from 'ui/components/icons';
import { useFormWizard } from 'ui/hooks';
import { shortenAddress } from '@stacks-os/utils';
import { Card } from 'ui/components/cards';
import { useProposalStore } from 'store';

interface ProposalDrawerProps extends ButtonProps {
  title: string;
}

const templateOptions = [
  {
    id: '1',
    icon: WalletIcon,
    name: 'Vault and asset management',
    description:
      'Transfer and manage your assets, add new tokens to whitelist, etc.',
  },
  {
    id: '2',
    icon: UpgradeIcon,
    name: 'Protocol upgrades',
    description:
      'Upgrade your protocol configuration, add new extensions, etc.',
  },
];

const SelectTemplate = () => {
  const proposal = useProposalStore((state) => state.proposal);
  const handleSelectTemplate = useProposalStore(
    (state) => state.handleSelectTemplate,
  );

  return (
    <Stack
      spacing='6'
      px={{ base: '8', md: '8' }}
      py={{ base: '16', md: '16' }}
      justify='center'
      h='75vh'
    >
      <Box>
        <Text fontSize='lg' fontWeight='medium'>
          Select a template
        </Text>
        <Text color='light.500' fontSize='sm' maxW='lg'>
          Start building out your proposal by choosing from the options below.
        </Text>
      </Box>
      <Stack spacing='3'>
        <FormControl>
          <RadioCardGroup
            defaultValue='1'
            onChange={(value) => {
              handleSelectTemplate(value);
            }}
            value={proposal.selectedTemplate}
            spacing='3'
          >
            {templateOptions?.map((option) => (
              <RadioCard
                key={option.id}
                value={option.id}
                p='5'
                borderRadius='lg'
                _hover={{
                  bg: 'dark.800',
                  borderColor: 'secondary.900',
                }}
              >
                <HStack spacing='3'>
                  <Square
                    size='8'
                    bg='dark.500'
                    color='inverted'
                    borderRadius='lg'
                  >
                    <Icon
                      as={option.icon}
                      boxSize={{ base: '4', md: '5' }}
                      color='primary.900'
                    />
                  </Square>
                  <Stack spacing='0'>
                    <Text
                      color='emphasized'
                      fontWeight='semibold'
                      fontSize='md'
                    >
                      {option.name}
                    </Text>
                    <Text color='light.500' fontSize='sm'>
                      {option.description}
                    </Text>
                  </Stack>
                </HStack>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
};

const TransferTemplate = ({ back, next }: any) => {
  const handleSelectTemplate = useProposalStore(
    (state) => state.handleSelectTemplate,
  );
  const goBack = () => {
    handleSelectTemplate('');
    back();
  };

  return (
    <Stack spacing='6'>
      <Stack as='form'>
        <Box>
          <Text fontSize='lg' fontWeight='medium'>
            Transfer Details
          </Text>
          <Text color='light.500' fontSize='sm' maxW='lg'>
            Start building out your proposal by choosing from the options below.
          </Text>
        </Box>
        <HStack spacing={4}>
          <SimpleGrid columns={4} spacing={4} mb='2'>
            {[].map((address) => (
              <Tag
                key={address}
                size='lg'
                borderRadius='full'
                variant='dark'
                onClick={() => console.log('remove member')}
              >
                <TagLabel>{address && shortenAddress(address)}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </SimpleGrid>
        </HStack>
        <Stack spacing='3'>
          <FormControl>
            <Stack spacing='4'>
              <Grid templateColumns='repeat(7, 1fr)' gap='4'>
                <GridItem colSpan={2}>
                  <HStack justify='space-between' align='center' spacing='2'>
                    <InputGroup>
                      <Input
                        id='amount'
                        autoComplete='off'
                        placeholder='100'
                        size='lg'
                        value='value'
                      />
                      <InputRightElement right='25px' top='4px'>
                        <HStack borderRadius='lg'>
                          <Image
                            cursor='pointer'
                            height='16px'
                            src='https://cryptologos.cc/logos/stacks-stx-logo.png?v=022'
                            alt='logo'
                          />

                          <Text
                            fontSize='sm'
                            fontWeight='semibold'
                            color='light.500'
                          >
                            STX
                          </Text>
                        </HStack>
                      </InputRightElement>
                    </InputGroup>
                  </HStack>
                </GridItem>
                <GridItem colSpan={5}>
                  <InputGroup>
                    <Input
                      id='address'
                      autoComplete='off'
                      placeholder='Recipient address'
                      size='lg'
                      value='value'
                    />
                  </InputGroup>
                </GridItem>
              </Grid>
              <Button
                size='sm'
                variant='dark'
                position='relative'
                top='1'
                onClick={() => console.log('invalid')}
              >
                Add another recipient
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      </Stack>
      <Stack justify='space-between' direction='row'>
        <Button size='sm' variant='link' onClick={goBack}>
          Back
        </Button>
        <Button size='sm' variant='default' onClick={next}>
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

const TransferDetails = ({ back, next }: any) => (
  <Stack spacing='6' px={{ base: '6', md: '8' }} py={{ base: '12', md: '16' }}>
    <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
      <Icon
        as={GearIcon}
        boxSize={{ base: '6', md: '7' }}
        color='primary.900'
      />
    </Square>
    <Stack>
      <Heading size='lg' fontWeight='black' color='light.900'>
        Proposal Details
      </Heading>
      <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
        You must be a club member to submit an idea and vote on others. There is
        no limit to the number of ideas you can submit and vote on.
      </Text>
    </Stack>
    <Stack spacing='3'>
      <FormControl>
        <Stack spacing='4'>
          <Grid templateColumns='repeat(5, 1fr)' gap='4'>
            <GridItem colSpan={5}>
              <FormControl>
                <FormLabel htmlFor='name' fontWeight='light' color='gray'>
                  Title
                </FormLabel>
                <Input
                  id='title'
                  autoComplete='off'
                  placeholder='Give your proposal a name'
                  size='lg'
                  value=''
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={5}>
              <FormControl>
                <FormLabel htmlFor='name' fontWeight='light' color='gray'>
                  TL;DR
                </FormLabel>
                <Textarea
                  id='description'
                  autoComplete='off'
                  placeholder='In three sentences or less, explain your proposal'
                  size='lg'
                  rows={3}
                  value=''
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={5}>
              <FormControl>
                <FormLabel htmlFor='body' fontWeight='light' color='gray'>
                  Description
                </FormLabel>
                <Textarea
                  id='body'
                  autoComplete='off'
                  placeholder='Describe your proposal in detail'
                  size='lg'
                  rows={10}
                  value=''
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Stack>
      </FormControl>
    </Stack>
    <Stack justify='space-between' direction='row'>
      <Button size='lg' variant='link' onClick={back}>
        Back
      </Button>
      <Button size='lg' variant='default' onClick={next}>
        Continue
      </Button>
    </Stack>
  </Stack>
);

const TransferReview = ({ back }: any) => (
  <Stack spacing='6' px={{ base: '6', md: '8' }} py={{ base: '12', md: '16' }}>
    <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
      <Icon
        as={GearIcon}
        boxSize={{ base: '6', md: '7' }}
        color='primary.900'
      />
    </Square>
    <Stack>
      <Heading size='lg' fontWeight='black' color='light.900'>
        Review &amp; Deploy
      </Heading>
      <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
        You must be a club member to submit an idea and vote on others. There is
        no limit to the number of ideas you can submit and vote on.
      </Text>
    </Stack>
    <Stack spacing='3'>
      <Card h='fit-content' bg='dark.800'>
        <Stack spacing='0'>
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '6', md: '6' }}
            spacing='2'
          >
            <Stack spacing='3'>
              <Stack spacing='0'>
                <Grid
                  templateColumns='repeat(5, 1fr)'
                  gap={8}
                  alignItems='center'
                >
                  <GridItem colSpan={{ base: 2, md: 4 }}>
                    <Stack spacing='1'>
                      <HStack align='flex-start' spacing='4'>
                        <Stack spacing='1' maxW='lg'>
                          <Heading size='md' fontWeight='black'>
                            1. Deploy proposal contract
                          </Heading>
                          <Text fontSize='sm' fontWeight='light' color='gray'>
                            Deploy your proposal on-chain for submission.
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                  </GridItem>
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <Button size='lg' variant='default' type='submit'>
                      Deploy
                    </Button>
                  </GridItem>
                </Grid>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Card h='fit-content' bg='dark.800'>
        <Stack spacing='0'>
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '6', md: '6' }}
            spacing='2'
          >
            <Stack spacing='3'>
              <Stack spacing='0'>
                <Grid
                  templateColumns='repeat(5, 1fr)'
                  gap={8}
                  alignItems='center'
                >
                  <GridItem colSpan={{ base: 2, md: 4 }}>
                    <Stack spacing='1'>
                      <HStack align='flex-start' spacing='4'>
                        <Stack spacing='1' maxW='lg'>
                          <Heading size='md' fontWeight='black'>
                            2. Submit proposal
                          </Heading>
                          <Text fontSize='sm' fontWeight='light' color='gray'>
                            Awaiting proposal contract deployment.
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                  </GridItem>
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <Button size='lg' variant='default' type='submit'>
                      Submit
                    </Button>
                  </GridItem>
                </Grid>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Stack>
    <Stack justify='flex-start' direction='row'>
      <Button size='lg' variant='link' onClick={back}>
        Back
      </Button>
    </Stack>
  </Stack>
);

const transferComponents = [
  {
    title: 'Select Template',
    component: <TransferTemplate />,
  },
  {
    title: 'Details',
    component: <TransferDetails />,
  },
  {
    title: 'Review',
    component: <TransferReview />,
  },
];

// const UpgradeTemplate = ({ back, next }: any) => {
//   const handleSelectTemplate = useProposalStore(
//     (state) => state.handleSelectTemplate,
//   );
//   const goBack = () => {
//     handleSelectTemplate('');
//     back();
//   };

//   return (
//     <Stack
//       spacing='3'
//       px={{ base: '6', md: '8' }}
//       py={{ base: '12', md: '16' }}
//     >
//       <Square size='8' bg='dark.500' color='inverted' borderRadius='lg'>
//         <Icon
//           as={TransferIcon}
//           boxSize={{ base: '3', md: '4' }}
//           color='primary.900'
//         />
//       </Square>
//       <Box>
//         <Text fontSize='lg' fontWeight='medium'>
//           Upgrade Protocol
//         </Text>
//         <Text color='light.500' fontSize='sm' maxW='lg'>
//           Start building out your proposal by choosing from the options below.
//         </Text>
//       </Box>
//       <HStack spacing={4}>
//         <SimpleGrid columns={4} spacing={4} mb='2'>
//           {[].map((address) => (
//             <Tag
//               key={address}
//               size='lg'
//               borderRadius='full'
//               variant='dark'
//               onClick={() => console.log('remove member')}
//             >
//               <TagLabel>{address && shortenAddress(address)}</TagLabel>
//               <TagCloseButton />
//             </Tag>
//           ))}
//         </SimpleGrid>
//       </HStack>
//       <Stack spacing='3'>
//         <FormControl>
//           <Stack spacing='4'>
//             <Grid templateColumns='repeat(7, 1fr)' gap='4'>
//               <GridItem colSpan={2}>
//                 <HStack justify='space-between' align='center' spacing='2'>
//                   <InputGroup>
//                     <Input
//                       id='amount'
//                       autoComplete='off'
//                       placeholder='100'
//                       size='lg'
//                       value='value'
//                     />
//                     <InputRightElement right='25px' top='4px'>
//                       <HStack borderRadius='lg'>
//                         <Image
//                           cursor='pointer'
//                           height='16px'
//                           src='https://cryptologos.cc/logos/stacks-stx-logo.png?v=022'
//                           alt='logo'
//                         />

//                         <Text
//                           fontSize='sm'
//                           fontWeight='semibold'
//                           color='light.500'
//                         >
//                           STX
//                         </Text>
//                       </HStack>
//                     </InputRightElement>
//                   </InputGroup>
//                 </HStack>
//               </GridItem>
//               <GridItem colSpan={5}>
//                 <InputGroup>
//                   <Input
//                     id='address'
//                     autoComplete='off'
//                     placeholder='Recipient address'
//                     size='lg'
//                     value='value'
//                   />
//                 </InputGroup>
//               </GridItem>
//             </Grid>
//             <Button
//               size='sm'
//               variant='dark'
//               position='relative'
//               top='1'
//               onClick={() => console.log('invalid')}
//             >
//               Add another recipient
//             </Button>
//           </Stack>
//         </FormControl>
//       </Stack>
//       <Stack justify='space-between' direction='row'>
//         <Button size='sm' variant='link' onClick={goBack}>
//           Back
//         </Button>
//         <Button size='sm' variant='default' onClick={next}>
//           Continue
//         </Button>
//       </Stack>
//     </Stack>
//   );
// };

// const upgradeComponents = [
//   {
//     title: 'Select Template',
//     component: <UpgradeTemplate />,
//   },
// ];

const TransferComponent = (step: any, props: any) =>
  React.cloneElement(step.component, props);
const UpgradeComponent = (step: any, props: any) =>
  React.cloneElement(step.component, props);

const TransferDrawer = (step: any, props: any) => (
  <DrawerBody p='0'>
    <Stack
      spacing='6'
      px={{ base: '8', md: '8' }}
      py={{ base: '8', md: '8' }}
      justify='center'
    >
      <TransferComponent step={step} {...props} />
    </Stack>
  </DrawerBody>
);

const UpgradeDrawer = (step: any, props: any) => (
  <DrawerBody p='0'>
    <Stack
      spacing='6'
      px={{ base: '8', md: '8' }}
      py={{ base: '16', md: '16' }}
      justify='center'
    >
      <UpgradeComponent step={step} {...props} />
    </Stack>
  </DrawerBody>
);

const CurrentDrawer = ({
  step,
  back,
  next,
  selectedTemplate,
}: {
  step: any;
  back: () => void;
  next: () => void;
  selectedTemplate: string;
}) => {
  switch (selectedTemplate) {
    case '1':
      return <TransferDrawer step={step} back={back} next={next} />;
    case '2':
      return <UpgradeDrawer step={step} back={back} next={next} />;
    default:
      return <TransferDrawer />;
  }
};

export const ProposalDrawer = (props: ProposalDrawerProps) => {
  const proposal = useProposalStore((state) => state.proposal);
  const { title } = props;
  const focusField = React.useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    back: transferBack,
    next: transferNext,
    step: transferStep,
  } = useFormWizard(transferComponents);
  // const {
  //   back: upgradeBack,
  //   next: upgradeNext,
  //   step: upgradeStep,
  // } = useFormWizard(upgradeComponents);

  return (
    <>
      <Button {...props} onClick={onOpen}>
        {title}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='lg'
        onClose={onClose}
        initialFocusRef={focusField}
      >
        <DrawerContent bg='dark.900' borderWidth='1px' borderColor='dark.500'>
          <Flex
            justify='flex-end'
            align='center'
            bg='dark.800'
            borderBottomWidth='1px'
            borderBottomColor='dark.500'
            py='2'
            px='4'
          >
            <Button variant='dark' size='sm' onClick={onClose}>
              Cancel
            </Button>
          </Flex>
          {proposal?.selectedTemplate ? (
            <CurrentDrawer
              step={transferStep}
              back={transferBack}
              next={transferNext}
              selectedTemplate={proposal?.selectedTemplate}
            />
          ) : (
            <SelectTemplate />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
