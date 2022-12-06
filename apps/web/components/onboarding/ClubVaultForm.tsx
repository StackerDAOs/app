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
  Square,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  VStack,
} from 'ui';
import { useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { shortenAddress, validateContractAddress } from '@stacks-os/utils';
import { useVaultStore } from 'store';
import { findExtension } from 'utils';
import Papa from 'papaparse';
import { UploadIcon, CheckCircle } from 'ui/components/icons';

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
  const inputRef = React.useRef<any>(null);
  const vault = useVaultStore((state) => state.vault);
  const addAllowedToken = useVaultStore((state) => state.addAllowedToken);
  const removeAllowedToken = useVaultStore((state) => state.removeAllowedToken);
  const [filename, setFilename] = React.useState('');

  const handleFilePickerClick = () => {
    inputRef.current.click();
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setFilename(file.name);
    Papa.parse(file, {
      complete: (results: any) => {
        const validAddresses = results.data
          .flat()
          .filter((address: string) => validateContractAddress(address));
        console.log({ validAddresses });
        validAddresses.forEach((member: any) => {
          addAllowedToken(member);
        });
      },
    });
  };
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
      <GridItem colSpan={1}>
        <FormControl id='upload-member'>
          <Stack spacing='3'>
            <VStack
              bg='dark.800'
              py='3'
              px='6'
              spacing='3'
              onClick={handleFilePickerClick}
              borderColor='dark.500'
              borderWidth='1px'
              borderRadius='lg'
            >
              <Square size='8' bg='dark.500' borderRadius='lg'>
                <Icon as={UploadIcon} boxSize='4' color='muted' />
              </Square>
              <VStack spacing='1'>
                <HStack spacing='1' whiteSpace='nowrap'>
                  <Button variant='unstyled' color='light.900' size='sm'>
                    Upload asset addresses
                  </Button>
                </HStack>
                <Text fontSize='xs' color='muted'>
                  {filename ? `${filename}` : `CSV or XLSX`}
                </Text>
              </VStack>
              <input
                type='file'
                ref={inputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </VStack>
          </Stack>
        </FormControl>
      </GridItem>
      <GridItem colSpan={4}>
        <FormControl id='asset'>
          <Stack spacing='3'>
            <Input
              placeholder='Asset Contract Address'
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
            <FormHelperText fontWeight='light' color='gray'>
              Assets added manually will automatically be added to any CSV or
              XLSX file you upload.
            </FormHelperText>
            <HStack spacing={4}>
              <SimpleGrid columns={3} spacing={4}>
                {vault.listOfAllowedTokens.map((asset: string) => (
                  <Tag key={asset} size='sm' borderRadius='full' variant='dark'>
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
