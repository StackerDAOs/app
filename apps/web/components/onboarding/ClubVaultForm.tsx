import React from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from 'ui';
import { useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { shortenAddress } from '@stacks-os/utils';
import { useVaultStore } from 'store';
import { findExtension } from 'utils';
import { ArrowLeft, ArrowRight, CheckCircle } from 'ui/components/icons';

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

export const ClubVaultForm = (props: any) => {
  const { dao, back, next } = props;
  const extension = findExtension(dao?.extensions, 'Vault');
  const transaction = useTransaction(extension?.tx_id);
  const vault = useVaultStore((state) => state.vault);
  const hasAllowList = useVaultStore((state) => state.vault.hasAllowList);

  const FinishedState = () => {
    return (
      <Stack spacing='3' align='center' justify='center' h='75vh'>
        <Icon as={CheckCircle} color='primary.900' boxSize='12' />
        <Text
          fontSize='xl'
          fontWeight='bold'
          color='light.500'
          textAlign='center'
        >
          You're all set!
        </Text>
        <Text
          fontSize='md'
          fontWeight='light'
          color='light.500'
          textAlign='center'
          mt='4'
          maxW='md'
        >
          You can now mint your Membership Pass NFTs and distribute them to your
          members.
        </Text>
        <ButtonGroup as={Flex} spacing='6'>
          <Button
            variant='default'
            isFullWidth
            isDisabled={!extension}
            onClick={next}
          >
            Continue
          </Button>
        </ButtonGroup>
      </Stack>
    );
  };

  return (
    <Stack spacing='2'>
      <GridItem colSpan={3}>
        {transaction?.data?.tx_status === 'pending' ||
        transaction?.data?.tx_status === 'success' ? (
          <FinishedState />
        ) : (
          <Stack
            as={Flex}
            direction='row'
            pr={{ base: '8', md: '12' }}
            h='full'
          >
            <Box
              as='form'
              py='12'
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
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.8, type: 'linear' }}
              >
                <Stack spacing='12'>
                  <Stack spacing='12'>
                    <Stack spacing='6' direction='column'>
                      <Box>
                        <Text fontSize='lg' fontWeight='medium'>
                          Vault Configuration
                        </Text>
                      </Box>
                      <AllowlistSelectForm />
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
                                Add NFT and Token contract addresses to the
                                allowlist.
                              </Text>
                            </Box>
                            <AddTokenForm />
                          </Stack>
                        </motion.div>
                      ) : null}
                    </Stack>
                  </Stack>
                </Stack>
              </motion.div>
            </Box>
          </Stack>
        )}
      </GridItem>
    </Stack>
  );
};
