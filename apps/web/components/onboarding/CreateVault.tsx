import React from 'react';
import Link from 'next/link';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
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
  List,
  ListItem,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Spinner,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
} from 'ui';
import { Step } from 'ui/components/feedback';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { shortenAddress } from '@stacks-os/utils';
import { defaultTo, isEmpty, isString } from 'lodash';
import { useMultiStepForm } from 'ui/hooks';
import { useSteps, useVaultStore } from 'store';

type ShowFormProps = {
  isAvailable: boolean;
  isTransactionPending: boolean;
};

const AllowlistSelectForm = () => {
  const vault = useVaultStore((state) => state.vault);
  const handleSelect = useVaultStore((state) => state.handleSelectAllowList);
  return (
    <FormControl id='transferrable'>
      <FormLabel
        htmlFor='transferrable'
        fontWeight='light'
        color='light.500'
        maxW='md'
      >
        Do you want to require all assets stored in the vault to be whitelisted?
      </FormLabel>
      <ButtonGroup bg='base.900' borderRadius='lg' p='1' spacing='2'>
        <Stack align='center' direction='row' spacing='3'>
          <RadioGroup
            defaultValue='yes'
            onChange={handleSelect}
            value={vault.hasAllowList}
          >
            <Stack direction='row'>
              <Radio size='md' value='yes'>
                Yes
              </Radio>
              <Radio size='md' value='no' isDisabled>
                No
              </Radio>
            </Stack>
          </RadioGroup>
        </Stack>
      </ButtonGroup>
    </FormControl>
  );
};

const AddTokenForm = () => {
  const vault = useVaultStore((state) => state.vault);
  const addAllowedToken = useVaultStore((state) => state.addAllowedToken);
  const removeAllowedToken = useVaultStore((state) => state.removeAllowedToken);
  return (
    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
      <GridItem colSpan={2}>
        <FormControl id='asset'>
          <FormLabel htmlFor='asset' fontWeight='light' color='light.500'>
            Asset Contract Addresses
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
                  addAllowedToken(e.currentTarget.value);
                  e.currentTarget.value;
                  e.currentTarget.value = '';
                }
              }}
            />
            <HStack spacing={4}>
              <SimpleGrid columns={4} spacing={4}>
                {vault.listOfAllowedTokens.map((asset: string) => (
                  <Tag key={asset} size='lg' borderRadius='full' variant='dark'>
                    <TagLabel>{asset && shortenAddress(asset)}</TagLabel>
                    <TagCloseButton onClick={() => removeAllowedToken(asset)} />
                  </Tag>
                ))}
              </SimpleGrid>
            </HStack>
          </Stack>
        </FormControl>
      </GridItem>
    </Grid>
  );
};

const ShowForm = (state: ShowFormProps) => {
  const { currentStep, setStep } = useSteps();
  const vault = useVaultStore((state) => state.vault);
  const hasAllowList = useVaultStore((state) => state.vault.hasAllowList);
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
              <HStack spacing='0'>
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <Step
                    key={id}
                    cursor='pointer'
                    isActive={3 === id}
                    isCompleted={currentStep > id}
                    isLastStep={6 === id}
                  />
                ))}
              </HStack>
              <Stack spacing='6' direction='column'>
                <Box>
                  <Text fontSize='lg' fontWeight='medium'>
                    Vault Configuration
                  </Text>
                </Box>
                <AllowlistSelectForm />
              </Stack>
              {hasAllowList === 'yes' ? (
                <motion.div
                  key={1}
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.8, type: 'linear' }}
                >
                  <Stack spacing='6' direction='column'>
                    <Box>
                      <Text fontSize='lg' fontWeight='medium'>
                        Assets
                      </Text>
                      <Text color='light.500' fontSize='sm' maxW='md'>
                        Add NFT and Token contract addresses to the allowlist.
                      </Text>
                    </Box>
                    <AddTokenForm />
                  </Stack>
                </motion.div>
              ) : null}
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

export const CreateVault = (props: any) => {
  const data = useVaultStore((state) => state.vault);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const canDeploy = data;
  const isTransactionPending = false;
  const alreadyDeployed = false;
  return (
    <Box h='100vh'>
      <Grid templateColumns='repeat(5, 1fr)'>
        <GridItem colSpan={{ base: 5, md: 3, lg: 2 }} p='8' h='100vh'>
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
                <Stack spacing='8'>
                  <HStack spacing='3' width='40'>
                    {[...Array(6)].map((_, id) => (
                      <Step key={1} cursor='pointer' isActive={2 === id} />
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
                        Management
                      </Text>
                    </Badge>
                    <Stack
                      spacing={{ base: '4', md: '6' }}
                      maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                    >
                      <Stack spacing='3'>
                        <Heading size='2xl' fontWeight='thin'>
                          Vault
                        </Heading>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          fontWeight='light'
                          color='gray'
                        >
                          Your vault will store your Club&apos;s assets, like
                          fungible tokens and NFTs.
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
                                  Allowlist Assets
                                </Text>
                                <Text
                                  fontSize='lg'
                                  fontWeight='thin'
                                  color='light.500'
                                >
                                  {true ? 'Yes' : 'No'}
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
                                  Asset Count
                                </Text>
                                <Text
                                  fontSize='lg'
                                  fontWeight='thin'
                                  color='light.500'
                                >
                                  {defaultTo(
                                    data?.listOfAllowedTokens.length,
                                    0,
                                  )}
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
