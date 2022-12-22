import React from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  FormControl,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  VStack,
} from 'ui';
import { DashboardLayout } from '@components/layout';
import { Card } from 'ui/components/cards';
import { DepositButton } from '@components/buttons';
import { AssetTable } from '@components/tables';
import { useTeam, useTeamVaultBalance } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { map } from 'lodash';
import { findExtension, ustxToStx } from 'utils';

const transformResponse = (response: any) => {
  if (!response) return null;
  const {
    stx = { balance: '0' },
    fungible_tokens: fungibleTokens,
    non_fungible_tokens: nonFungibleTokens,
  } = response && response;
  const fungibleToken = {
    count: Object.keys(fungibleTokens).length,
    tokens: Object.keys(fungibleTokens).map((key) => ({
      ...fungibleTokens[key],
      address: key,
    })),
  };
  const nonFungibleToken = {
    count: Object.keys(nonFungibleTokens).length,
    tokens: Object.keys(nonFungibleTokens).map((key) => ({
      ...nonFungibleTokens[key],
      address: key,
    })),
  };
  return {
    stx,
    fungibleToken,
    nonFungibleToken,
  };
};

export default function Vault() {
  const [depositAmount, setDepositAmount] = React.useState('');
  const dao = useTeam();
  const vaultBalance = useTeamVaultBalance();
  const isActive = dao?.data?.active;
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const handleInputDeposit = (e: any) => {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setDepositAmount(e.target.value);
    }
  };
  const transformedResponse = transformResponse(vaultBalance?.data);
  console.log({ transformedResponse });

  if (!isActive) {
    return (
      <Stack align='center' justify='center' h='75vh'>
        <Card bg='dark.900' border='1px solid' borderColor='dark.500' w='25vw'>
          <Box
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
            bg='dark.700'
            borderTopLeftRadius='lg'
            borderTopRightRadius='lg'
          >
            <HStack justify='center'>
              <Text fontSize='md' fontWeight='medium' color='light.900'>
                Vault is not active yet
              </Text>
            </HStack>
          </Box>
          <Stack
            spacing={{ base: '0', md: '1' }}
            justify='center'
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
          >
            <Stack spacing='3'>
              <HStack justify='center' cursor='default'>
                <Button variant='default' size='sm' isDisabled>
                  Activate
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Stack spacing='8'>
        <Grid templateColumns='repeat(9, 1fr)' gap={6}>
          <GridItem colSpan={4}>
            <Card bg='dark.800' h='189px'>
              <Stack
                px={{ base: '6', md: '6' }}
                py={{ base: '6', md: '6' }}
                spacing='6'
              >
                <Heading
                  color='light.900'
                  fontSize='lg'
                  fontWeight='regular'
                  letterSpacing='tight'
                >
                  Treasury
                </Heading>
                <Stack spacing='3' justify='center' h='full'>
                  <HStack justify='space-between'>
                    <Text fontSize='md' fontWeight='regular' color='gray'>
                      Balance
                    </Text>
                    <Text fontSize='md' fontWeight='medium' color='light.900'>
                      {ustxToStx(transformedResponse?.stx?.balance)}{' '}
                      <Text as='span' fontSize='sm' fontWeight='thin'>
                        STX
                      </Text>
                    </Text>
                  </HStack>
                  <HStack justify='space-between'>
                    <Text fontSize='md' fontWeight='regular' color='gray'>
                      Tokens
                    </Text>
                    <Text fontSize='md' fontWeight='medium' color='light.900'>
                      {transformedResponse?.fungibleToken?.count}
                    </Text>
                  </HStack>
                  <HStack justify='space-between'>
                    <Text fontSize='md' fontWeight='regular' color='gray'>
                      Collectibles
                    </Text>
                    <Text fontSize='md' fontWeight='medium' color='light.900'>
                      {transformedResponse?.nonFungibleToken?.count}
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Card>
          </GridItem>
          <GridItem colSpan={5}>
            <Card h='fit-content' bg='dark.900'>
              <Stack spacing='0'>
                <Stack
                  spacing='6'
                  justify='space-between'
                  direction='row'
                  px={{ base: '6', md: '6' }}
                  py={{ base: '3', md: '3' }}
                  bg='dark.700'
                  borderTopLeftRadius='md'
                  borderTopRightRadius='md'
                  align='center'
                >
                  <Heading
                    color='light.900'
                    fontSize='md'
                    fontWeight='regular'
                    letterSpacing='tight'
                  >
                    Vault Deposit
                  </Heading>
                </Stack>
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='6'
                >
                  <HStack justify='space-between' align='center' spacing='2'>
                    <VStack align='flex-start' spacing='2'>
                      <FormControl>
                        <Input
                          py='1'
                          px='2'
                          bg='dark.900'
                          type='tel'
                          border='none'
                          fontSize='2xl'
                          fontWeight='regular'
                          autoComplete='off'
                          placeholder='0.0'
                          value={depositAmount}
                          onChange={handleInputDeposit}
                        />
                      </FormControl>
                    </VStack>
                    <HStack
                      bg='dark.900'
                      borderRadius='lg'
                      borderColor='dark.500'
                      borderWidth='1px'
                      py='1'
                      px='3'
                    >
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
                  </HStack>
                  <Stack spacing='3'>
                    <DepositButton
                      title='Deposit'
                      variant='secondary'
                      size='sm'
                      vaultAddress={vaultExtension?.contract_address}
                      amount={depositAmount}
                      isDisabled={depositAmount === ''}
                      reset={() => {
                        setDepositAmount('');
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </GridItem>
        </Grid>
        <Stack spacing='1'>
          <Tabs color='light.900' variant='unstyled' isFitted>
            <TabList>
              <ButtonGroup
                bg='dark.900'
                borderRadius='lg'
                borderWidth='1px'
                borderColor='dark.500'
              >
                {map(['Tokens', 'Collectibles'], (item) => (
                  <Tab
                    key={item}
                    borderRadius='lg'
                    color='light.500'
                    w='50%'
                    fontSize='sm'
                    _selected={{
                      color: 'light.900',
                      bg: 'dark.700',
                    }}
                  >
                    {item}
                  </Tab>
                ))}
              </ButtonGroup>
            </TabList>
            <TabPanels>
              <TabPanel px='0'>
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.25, type: 'linear' }}
                >
                  <Card>
                    <Stack spacing='5'>
                      <Box px={{ base: '4', md: '6' }} pt='5'>
                        <Stack
                          direction={{ base: 'column', md: 'row' }}
                          justify='space-between'
                          align='center'
                        >
                          <Text
                            color='light.900'
                            fontSize='lg'
                            fontWeight='regular'
                            letterSpacing='tight'
                          >
                            Tokens
                          </Text>
                          <InputGroup maxW='xs'>
                            <Input placeholder='Search' />
                          </InputGroup>
                        </Stack>
                      </Box>
                      <Box overflowX='auto'>
                        <AssetTable
                          assets={transformedResponse?.fungibleToken?.tokens}
                          bg='dark.900'
                          variant='simple'
                          size='sm'
                        />
                      </Box>
                    </Stack>
                  </Card>
                </motion.div>
              </TabPanel>
              <TabPanel px='0'>
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.25, type: 'linear' }}
                >
                  <Card>
                    <Stack spacing='5'>
                      <Box px={{ base: '4', md: '6' }} pt='5'>
                        <Stack
                          direction={{ base: 'column', md: 'row' }}
                          justify='space-between'
                          align='center'
                        >
                          <Text
                            color='light.900'
                            fontSize='lg'
                            fontWeight='regular'
                            letterSpacing='tight'
                          >
                            Collectibles
                          </Text>
                          <InputGroup maxW='xs'>
                            <Input placeholder='Search' />
                          </InputGroup>
                        </Stack>
                      </Box>
                      <Box overflowX='auto'>
                        <AssetTable
                          assets={transformedResponse?.nonFungibleToken?.tokens}
                          bg='dark.900'
                          variant='simple'
                          size='sm'
                        />
                      </Box>
                    </Stack>
                  </Card>
                </motion.div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </motion.div>
  );
}

Vault.getLayout = (page: any) => (
  <DashboardLayout
    header={
      <Flex justify='space-between' align='center' py='6' px='4'>
        <Heading size='lg' fontWeight='black' letterSpacing='tight'>
          Vault
        </Heading>
      </Flex>
    }
  >
    {page}
  </DashboardLayout>
);
