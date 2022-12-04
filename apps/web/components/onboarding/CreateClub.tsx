import React from 'react';
import Link from 'next/link';
import { coreDAO } from 'utils/contracts';
import { getTransaction } from 'api/clubs';
import { nameToSlug } from 'utils';
import { CLUB_TYPES } from 'api/constants';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
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
  Progress,
  SimpleGrid,
  Stack,
  Spinner,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { shortenAddress } from '@stacks-os/utils';
import { defaultTo, isEmpty, isString } from 'lodash';
import { StacksDeploy } from 'ui/components/buttons';
import { useSteps } from 'ui/store';
import { Step } from 'ui/components/feedback';
import { useGlobalState } from 'store';
import { useDAO, useTransaction } from 'ui/hooks';
import { ChevronRight, ArrowRight } from 'ui/components/icons';
import { useCreateClub } from 'api/clubs/mutations';

const NameForm = () => {
  const name = useGlobalState((state) => state.club.name);
  const updateName = useGlobalState((state) => state.updateName);
  return (
    <FormControl id='name'>
      <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
        Name
      </FormLabel>
      <Input
        placeholder='Stacks Investment Club'
        autoComplete='off'
        size='lg'
        value={name}
        onChange={(e) => updateName(e.target.value)}
      />
      <FormHelperText fontWeight='light' color='gray'>
        Easily identifyable name for your team.
      </FormHelperText>
    </FormControl>
  );
};

// const AddMemberForm = () => {
//   const members = useGlobalState((state) => state.club.members);
//   const addMember = useGlobalState((state) => state.addMember);
//   const removeMember = useGlobalState((state) => state.removeMember);
//   return (
//     <FormControl id='member'>
//       <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
//         STX Address
//       </FormLabel>
//       <Stack spacing='3'>
//         <Input
//           placeholder='SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE'
//           autoComplete='off'
//           size='lg'
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               console.log('value', e.currentTarget.value);
//               addMember(e.currentTarget.value);
//               e.currentTarget.value = '';
//             }
//           }}
//         />
//         <FormHelperText fontWeight='light' color='gray'>
//           Members will be minted a Club Pass and be able to deposit funds into
//           the Club once live. At least 2 members are required.
//         </FormHelperText>
//         <HStack spacing={4}>
//           <SimpleGrid columns={4} spacing={4}>
//             {members.map((member: string, index: number) => (
//               <Tag key={index} size='lg' borderRadius='full' variant='dark'>
//                 <TagLabel>{member && shortenAddress(member)}</TagLabel>
//                 <TagCloseButton onClick={() => removeMember(member)} />
//               </Tag>
//             ))}
//           </SimpleGrid>
//         </HStack>
//       </Stack>
//     </FormControl>
//   );
// };

export const CreateClub = (props: any) => {
  const data = useGlobalState((state) => state.club);
  const dao = useDAO(data?.name);
  const [transactionId, setTransactionId] = React.useState(dao?.data?.tx_id);
  const [isChecked, setIsChecked] = React.useState(false);
  const canDeploy =
    isChecked && data.name && data.members.length > 1 && !transactionId;
  const { currentStep, setStep } = useSteps();
  const transaction = useTransaction(transactionId);
  const isReady =
    transaction?.data?.tx_status === 'pending' ||
    transaction?.data?.tx_status === 'success';
  const createClub = useCreateClub();
  const onSuccess = async (transactionId: string, action: any) => {
    const transaction = await getTransaction(transactionId);
    const name = data?.name;
    const slug = nameToSlug(name);
    const type_id = CLUB_TYPES.INVESTMENT_CLUB;
    const txId = transactionId;
    const userAddress = transaction?.sender_address;
    const contractAddress = transaction?.smart_contract?.contract_id;
    const config = {
      memberAddresses: data?.members,
    };

    action.mutate(
      {
        club: {
          name,
          slug,
          type_id,
          tx_id: txId,
          contract_address: contractAddress,
          creator_address: userAddress,
          config,
        },
        userAddress,
      },
      {
        onSuccess: () => {
          setTransactionId(transactionId);
        },
      },
    );
  };

  return (
    <Box h='100vh'>
      <Grid templateColumns='repeat(5, 1fr)'>
        <GridItem colSpan={{ base: 5, md: 3, lg: 2 }} p='16' h='100vh'>
          <Stack
            as={Flex}
            direction='row'
            py={{ base: '16', md: '12' }}
            px={{ base: '8', md: '12' }}
            bg='dark.800'
            borderWidth='1px'
            borderColor='dark.500'
            borderRadius='xl'
            h='full'
            backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #121416)'
            opacity='1'
          >
            <Stack spacing={{ base: '8', md: '12' }} justify='space-between'>
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.8, type: 'linear' }}
              >
                <Stack spacing='4'>
                  <Badge
                    color='primary.900'
                    bg='dark.500'
                    alignSelf='start'
                    size='lg'
                    py='1'
                    px='3'
                    borderRadius='3xl'
                  >
                    <Text as='span' fontWeight='regular'>
                      Get started
                    </Text>
                  </Badge>
                  <Stack
                    spacing={{ base: '4', md: '6' }}
                    maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                  >
                    <Stack spacing='3'>
                      <Heading size='2xl' fontWeight='thin'>
                        Create Club
                      </Heading>
                      <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        fontWeight='light'
                        color='gray'
                      >
                        Your Club name will be used to generate a unique URL for
                        your members to join and manage funds.
                      </Text>
                    </Stack>
                    <Stack spacing={{ base: '8', md: '10' }}>
                      <Stack spacing={{ base: '2', md: '4' }}>
                        <Stack spacing='8'>
                          <Stack py={{ base: '3', md: '3' }} spacing='2'>
                            <Stack
                              pt='1'
                              px='1'
                              align='center'
                              direction='row'
                              justify='space-between'
                              borderTopWidth='1px'
                              borderColor='dark.500'
                            >
                              <Text
                                fontSize='lg'
                                fontWeight='thin'
                                color='gray'
                              >
                                Club Name
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='thin'
                                color='light.500'
                              >
                                {defaultTo(
                                  data.name === '' ? undefined : data.name,
                                  '---',
                                )}
                              </Text>
                            </Stack>
                            <Stack
                              pt='1'
                              px='1'
                              align='center'
                              direction='row'
                              justify='space-between'
                              borderTopWidth='1px'
                              borderColor='dark.500'
                            >
                              <Text
                                fontSize='lg'
                                fontWeight='thin'
                                color='gray'
                              >
                                Total Members
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='thin'
                                color='light.500'
                              >
                                {defaultTo(data?.members.length, 1)}
                              </Text>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </motion.div>
              <Stack spacing='6'>
                <StacksDeploy
                  variant='primary'
                  buttonName='Deploy'
                  template={coreDAO()}
                  onSuccess={(transaction) =>
                    onSuccess(transaction?.txId, createClub)
                  }
                  isDisabled={!canDeploy}
                />
                <Stack direction='row' justify='center'>
                  <Checkbox
                    size='sm'
                    colorScheme='primary'
                    onChange={(e) => setIsChecked(e.currentTarget.checked)}
                  >
                    <Text as='span' textAlign='center'>
                      You agree to the terms and conditions
                    </Text>
                  </Checkbox>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem colSpan={3}>
          <Stack
            as={Flex}
            direction='row'
            pr={{ base: '8', md: '12' }}
            h='full'
            align='center'
            justify='center'
          >
            <Box
              as='form'
              bg='dark.900'
              w='100%'
              overflowY='scroll'
              overflowX='hidden'
              scrollBehavior='smooth'
              h='75vh'
              css={{
                '&::-webkit-scrollbar': {
                  width: '0',
                },
              }}
            >
              <motion.div
                key={transactionId?.toString()}
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.8, type: 'linear' }}
              >
                <Stack spacing='12'>
                  <HStack spacing='0'>
                    {[1, 2, 3, 4, 5, 6].map((id) => (
                      <Step
                        key={id}
                        cursor='pointer'
                        isActive={1 === id}
                        isCompleted={currentStep > id}
                        isLastStep={6 === id}
                      />
                    ))}
                  </HStack>
                  {isReady ? (
                    <Stack spacing='6'>
                      <Stack spacing='1' direction='column'>
                        <Heading size='md' fontWeight='medium'>
                          Your Club contract is pending
                        </Heading>
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight='light'
                          color='gray'
                          maxW='xl'
                        >
                          You're on your way to creating your own investment
                          club. The next few steps will walk you through
                          deploying your Club's extensions.
                        </Text>
                      </Stack>
                      <HStack justify='flex-start'>
                        <Button
                          variant='default'
                          rightIcon={<ArrowRight />}
                          onClick={() => setStep(currentStep + 1)}
                        >
                          Deploy Club Membership Pass
                        </Button>
                      </HStack>
                    </Stack>
                  ) : (
                    <Stack spacing='12'>
                      <Stack spacing='3' direction='column'>
                        <Box>
                          <Text fontSize='lg' fontWeight='medium'>
                            Club Details
                          </Text>
                        </Box>
                        <NameForm />
                      </Stack>
                      <Stack spacing='3' direction='column'>
                        <Box>
                          <Text fontSize='lg' fontWeight='medium'>
                            Club Members
                          </Text>
                        </Box>
                        <AddMemberForm />
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </motion.div>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};
