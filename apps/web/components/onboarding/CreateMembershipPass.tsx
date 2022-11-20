import React from 'react';
import Link from 'next/link';
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
  Radio,
  RadioGroup,
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
import { useSteps } from 'ui/store';
import { useClubMembershipPass } from 'store';

type ShowFormProps = {
  isAvailable: boolean;
  isTransactionPending: boolean;
};

const NFTMetadataForm = () => {
  const name = useClubMembershipPass((state) => state.membershipPass.name);
  const symbol = useClubMembershipPass((state) => state.membershipPass.symbol);
  const maxSupply = useClubMembershipPass(
    (state) => state.membershipPass.maxSupply,
  );
  const isTransferrable = useClubMembershipPass(
    (state) => state.membershipPass.isTransferrable,
  );
  const updateName = useClubMembershipPass((state) => state.updateName);
  const updateSymbol = useClubMembershipPass((state) => state.updateSymbol);
  const updateMaxSupply = useClubMembershipPass(
    (state) => state.updateMaxSupply,
  );
  const handleSelect = useClubMembershipPass(
    (state) => state.handleSelectTransferrable,
  );
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
      <GridItem colSpan={2}>
        <FormControl id='name'>
          <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
            Name
          </FormLabel>
          <Input
            placeholder='Stacks Club Pass'
            autoComplete='off'
            size='lg'
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id='name'>
          <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
            Symbol
          </FormLabel>
          <Input
            placeholder='SCP'
            autoComplete='off'
            size='lg'
            value={symbol}
            onChange={(e) => updateSymbol(e.target.value)}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id='name'>
          <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
            Max Supply
          </FormLabel>
          <Input
            placeholder='99'
            autoComplete='off'
            size='lg'
            value={maxSupply}
            onChange={(e) => updateMaxSupply(e.target.value)}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={3}>
        <FormControl id='transferrable'>
          <FormLabel
            htmlFor='transferrable'
            fontWeight='light'
            color='light.500'
            maxW='md'
          >
            Do you want to keep your Membership Pass non-transferrable in the
            future?
          </FormLabel>
          <ButtonGroup bg='base.900' borderRadius='lg' p='1' spacing='2'>
            <Stack align='center' direction='row' spacing='3'>
              <RadioGroup
                defaultValue='yes'
                onChange={handleSelect}
                value={isTransferrable}
              >
                <Stack direction='row'>
                  <Radio
                    bg='base.900'
                    size='md'
                    borderColor='base.500'
                    value='yes'
                    _focus={{ outline: 'none' }}
                    _checked={{
                      bg: 'primary.900',
                      color: 'white',
                      borderColor: 'base.500',
                    }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    bg='base.900'
                    size='md'
                    borderColor='base.500'
                    value='no'
                    _focus={{ outline: 'none' }}
                    _checked={{
                      bg: 'primary.900',
                      color: 'white',
                      borderColor: 'base.500',
                    }}
                  >
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </ButtonGroup>
        </FormControl>
      </GridItem>
    </Grid>
  );
};

const EditTransferrableForm = () => {
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
        />
      </Stack>
    </FormControl>
  );
};

const ShowForm = (state: ShowFormProps) => {
  const { currentStep, setStep } = useSteps();
  const isTransferrable = useClubMembershipPass(
    (state) => state.membershipPass.isTransferrable,
  );
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
                    NFT Metadata
                  </Text>
                </Box>
                <NFTMetadataForm />
              </Stack>
              {isTransferrable === 'no' ? (
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
                        Club Members
                      </Text>
                      <Text color='light.500' fontSize='sm' maxW='lg'>
                        Members will be minted a Club Pass and be able to
                        deposit funds into the Club once live. At least 2
                        members are required.
                      </Text>
                    </Box>
                    <EditTransferrableForm />
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

export const CreateMembershipPass = (props: any) => {
  const data = useClubMembershipPass((state) => state.membershipPass);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const canDeploy = data.name && data.symbol;
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
                      <Step key={1} cursor='pointer' isActive={0 === id} />
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
                        Governance
                      </Text>
                    </Badge>
                    <Stack
                      spacing={{ base: '4', md: '6' }}
                      maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                    >
                      <Stack spacing='3'>
                        <Heading size='2xl' fontWeight='thin'>
                          Club Pass
                        </Heading>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          fontWeight='light'
                          color='gray'
                        >
                          Club Passes are non-transferable NFTs and define your
                          Club&apos;s membership. They are required to deposit
                          into the Club.
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
                                  Name
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
                                  Symbol
                                </Text>
                                <Text
                                  fontSize='lg'
                                  fontWeight='thin'
                                  color='light.500'
                                >
                                  {defaultTo(
                                    data.symbol === ''
                                      ? undefined
                                      : data.symbol,
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
                                  Max supply
                                </Text>
                                <Text
                                  fontSize='lg'
                                  fontWeight='thin'
                                  color='light.500'
                                >
                                  {defaultTo(
                                    data.maxSupply === ''
                                      ? '99'
                                      : data.maxSupply,
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
                                  Non-transferrable
                                </Text>
                                <Text
                                  fontSize='lg'
                                  fontWeight='thin'
                                  color='light.500'
                                >
                                  {data.isTransferrable === 'yes'
                                    ? 'Yes'
                                    : 'No'}
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
