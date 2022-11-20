import React from 'react';
import Link from 'next/link';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
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
  Input,
  SimpleGrid,
  Stack,
  Spinner,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from 'ui';
import { Step } from 'ui/components/feedback';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { shortenAddress } from '@stacks-os/utils';
import { defaultTo, isEmpty, isString } from 'lodash';
import { useMultiStepForm } from 'ui/hooks';
import { useSteps } from 'ui/store';
import { useGlobalState } from 'store';

type ShowFormProps = {
  isAvailable: boolean;
  isTransactionPending: boolean;
};

const NameForm = () => {
  const name = useGlobalState((state) => state.club.name);
  const updateName = useGlobalState((state) => state.updateName);
  return (
    <FormControl id='name'>
      <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
        Club Name
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

const AddMemberForm = () => {
  const members = useGlobalState((state) => state.club.members);
  const addMember = useGlobalState((state) => state.addMember);
  const removeMember = useGlobalState((state) => state.removeMember);
  return (
    <FormControl id='member'>
      <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
        Member Address
      </FormLabel>
      <Stack spacing='3'>
        <Input
          placeholder='SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE'
          autoComplete='off'
          size='lg'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              console.log('value', e.currentTarget.value);
              addMember(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <HStack spacing={4}>
          <SimpleGrid columns={4} spacing={4}>
            {members.map((member: string) => (
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
      </Stack>
    </FormControl>
  );
};

const ShowForm = (state: ShowFormProps) => {
  const { currentStep, setStep } = useSteps();
  if (state.isAvailable) {
    return (
      <Stack
        as={Flex}
        direction='row'
        pr={{ base: '8', md: '12' }}
        h='full'
        align='center'
        justify='center'
      >
        <Box as='form' bg='dark.900' w='100%'>
          <motion.div
            key={state?.isAvailable?.toString()}
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.8, type: 'linear' }}
          >
            <Stack
              spacing='12'
              px={{ base: '4', md: '6' }}
              py={{ base: '5', md: '6' }}
            >
              <Stack spacing='6' direction='column'>
                <Box>
                  <Text fontSize='lg' fontWeight='medium'>
                    General Information
                  </Text>
                </Box>
                <NameForm />
              </Stack>
              <Stack spacing='6' direction='column'>
                <Box>
                  <Text fontSize='lg' fontWeight='medium'>
                    Club Members
                  </Text>
                  <Text color='light.500' fontSize='sm' maxW='md'>
                    Members will be minted a Club Pass and be able to deposit
                    funds into the Club once live. At least 2 members are
                    required.
                  </Text>
                </Box>
                <AddMemberForm />
              </Stack>
            </Stack>
          </motion.div>
        </Box>
      </Stack>
    );
  }

  if (state.isTransactionPending) {
    return (
      <Stack as={Flex} h='100vh' align='center' justify='center'>
        <motion.div
          key={state?.isAvailable?.toString()}
          variants={FADE_IN_VARIANTS}
          initial={FADE_IN_VARIANTS.hidden}
          animate={FADE_IN_VARIANTS.enter}
          exit={FADE_IN_VARIANTS.exit}
          transition={{ duration: 0.8, type: 'linear' }}
        >
          <Stack spacing={{ base: '8', md: '10' }} align='center'>
            <Stack spacing='3' align='center'>
              <Heading size='2xl' fontWeight='thin'>
                Create Club
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                fontWeight='light'
                color='gray'
                maxW='xl'
                textAlign='center'
              >
                Your Club name will be used to generate a unique URL for your
                members to join and manage funds.
              </Text>
            </Stack>
            <Button variant='link' size='lg' colorScheme='dark'>
              View transaction in explorer
            </Button>
            <Button
              size='lg'
              variant='default'
              onClick={() => setStep(currentStep + 1)}
            >
              Next
            </Button>
          </Stack>
        </motion.div>
      </Stack>
    );
  }

  return (
    <Stack as={Flex} h='100vh' align='center' justify='center'>
      <motion.div
        key={state?.isAvailable?.toString()}
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.8, type: 'linear' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} align='center'>
          <Stack spacing='3' align='center'>
            <Heading size='2xl' fontWeight='thin'>
              You&apos;re ready!
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight='light'
              color='gray'
              maxW='xl'
              textAlign='center'
            >
              Your Club name will be used to generate a unique URL for your
              members to join and manage funds.
            </Text>
          </Stack>
          <Link href='/daos'>
            <Button variant='link' size='lg' colorScheme='dark'>
              Start configuring your Club
            </Button>
          </Link>
          <Button
            size='lg'
            variant='default'
            onClick={() => setStep(currentStep + 1)}
          >
            Next
          </Button>
        </Stack>
      </motion.div>
    </Stack>
  );
};

export const CreateSubmission = (props: any) => {
  const data = useGlobalState((state) => state.club);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(false);
  const canDeploy = isChecked && data.name && data.members.length > 1;
  const isTransactionPending = false;
  const alreadyDeployed = false;
  return (
    <Box h='100vh'>
      <Grid templateColumns='repeat(5, 1fr)'>
        <GridItem colSpan={{ base: 5, md: 3, lg: 2 }} p='6' h='100vh'>
          <Stack
            as={Flex}
            direction='row'
            py={{ base: '16', md: '24' }}
            px={{ base: '8', md: '12' }}
            bg='dark.800'
            borderWidth='1px'
            borderColor='dark.500'
            borderRadius='xl'
            h='full'
            backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
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
                <Stack spacing='8'>
                  <HStack spacing='3' width='40'>
                    {[...Array(6)].map((_, id) => (
                      <Step key={1} cursor='pointer' isActive={4 === id} />
                    ))}
                  </HStack>
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
                        Action
                      </Text>
                    </Badge>
                    <Stack
                      spacing={{ base: '4', md: '6' }}
                      maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                    >
                      <Stack spacing='3'>
                        <Heading size='2xl' fontWeight='thin'>
                          Proposal Submission
                        </Heading>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          fontWeight='light'
                          color='gray'
                        >
                          Submit on-chain proposals as a Club Pass holder. Clubs
                          can approve proposals to change these rules.
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
                </Stack>
              </motion.div>
              <Stack spacing='6'>
                <Button
                  size='lg'
                  variant='primary'
                  isDisabled={!canDeploy || alreadyDeployed}
                  isLoading={isTransactionPending}
                  onClick={() => setIsAvailable(!isAvailable)}
                >
                  Deploy
                </Button>
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
          <ShowForm
            isAvailable={isAvailable}
            isTransactionPending={isTransactionPending}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
