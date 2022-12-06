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
import { shortenAddress, validateStacksAddress } from '@stacks-os/utils';
import { useClubMembershipPass, useGlobalState } from 'store';
import { findExtension } from 'utils';
import Papa from 'papaparse';
import { CheckCircle, UploadIcon } from 'ui/components/icons';

const NFTMetadataForm = () => {
  const name = useClubMembershipPass((state) => state.membershipPass.name);
  const symbol = useClubMembershipPass((state) => state.membershipPass.symbol);
  const maxSupply = useClubMembershipPass(
    (state) => state.membershipPass.maxSupply,
  );
  const updateName = useClubMembershipPass((state) => state.updateName);
  const updateSymbol = useClubMembershipPass((state) => state.updateSymbol);
  const updateMaxSupply = useClubMembershipPass(
    (state) => state.updateMaxSupply,
  );

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
      <GridItem colSpan={3}>
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
            Max supply
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
    </Grid>
  );
};

const FinishedState = ({ next, extension }: any) => (
  <Stack spacing='3' align='center' justify='center' h='75vh'>
    <Icon as={CheckCircle} color='primary.900' boxSize='12' />
    <Text fontSize='xl' fontWeight='bold' color='light.500' textAlign='center'>
      You&apos;re all set!
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

export const ClubMembershipPassForm = (props: any) => {
  const { dao, next } = props;
  const inputRef = React.useRef<any>(null);
  const extension = findExtension(dao?.extensions, 'NFT Membership');
  const transaction = useTransaction(extension?.tx_id);
  const members = useGlobalState((state) => state.club.members);
  const addMember = useGlobalState((state) => state.addMember);
  const removeMember = useGlobalState((state) => state.removeMember);

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
          .filter((address: string) => validateStacksAddress(address));
        console.log({ validAddresses });
        validAddresses.forEach((member: any) => {
          addMember(member);
        });
      },
    });
  };

  return (
    <Stack spacing='2'>
      <GridItem colSpan={3}>
        {transaction?.data?.tx_status === 'pending' ||
        transaction?.data?.tx_status === 'success' ? (
          <FinishedState next={next} extension={extension} />
        ) : (
          <Stack
            as={Flex}
            direction='row'
            pr={{ base: '8', md: '12' }}
            h='full'
          >
            <Box
              as='form'
              py='10'
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
                          NFT Metadata
                        </Text>
                        <Text color='light.500' fontSize='sm' maxW='lg'>
                          Standard metadata for your NFT. The max supply
                          represents the # of members allowed in your Club.
                          Capped at 99.
                        </Text>
                      </Box>
                      <NFTMetadataForm />
                    </Stack>
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
                                <Square
                                  size='8'
                                  bg='dark.500'
                                  borderRadius='lg'
                                >
                                  <Icon
                                    as={UploadIcon}
                                    boxSize='4'
                                    color='muted'
                                  />
                                </Square>
                                <VStack spacing='1'>
                                  <HStack spacing='1' whiteSpace='nowrap'>
                                    <Button
                                      variant='unstyled'
                                      color='light.900'
                                      size='sm'
                                    >
                                      Upload Club member addresses
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
                          <FormControl id='member'>
                            <Stack spacing='3'>
                              <Input
                                placeholder='STX Address'
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
                              <FormHelperText fontWeight='light' color='gray'>
                                Members you add manually will automatically be
                                added to any CSV or XLSX file you upload.
                              </FormHelperText>
                              <HStack>
                                <SimpleGrid columns={3} spacing={4}>
                                  {members.map((member: string) => (
                                    <Tag
                                      key={member}
                                      size='sm'
                                      borderRadius='full'
                                      variant='dark'
                                    >
                                      <TagLabel>
                                        {member && shortenAddress(member)}
                                      </TagLabel>
                                      <TagCloseButton
                                        onClick={() => removeMember(member)}
                                      />
                                    </Tag>
                                  ))}
                                </SimpleGrid>
                              </HStack>
                            </Stack>
                          </FormControl>
                        </GridItem>
                      </Grid>
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
