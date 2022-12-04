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
import { useSteps, useClubTokenStore, useGlobalState } from 'store';
import { findExtension } from 'utils';
import { ArrowLeft, ArrowRight, CheckCircle } from 'ui/components/icons';

const NFTMetadataForm = () => {
  const name = useClubTokenStore((state) => state.token.name);
  const symbol = useClubTokenStore((state) => state.token.symbol);
  const tokenUri = useClubTokenStore((state) => state.token.tokenUri);
  const isTransferrable = useClubTokenStore(
    (state) => state.token.isTransferrable,
  );
  const updateName = useClubTokenStore((state) => state.updateName);
  const updateSymbol = useClubTokenStore((state) => state.updateSymbol);
  const updateTokenUri = useClubTokenStore((state) => state.updateTokenUri);
  const handleSelect = useClubTokenStore(
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
            Token URI
          </FormLabel>
          <Input
            placeholder='ipfs://Qm...'
            autoComplete='off'
            size='lg'
            value={tokenUri}
            onChange={(e) => updateTokenUri(e.target.value)}
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
                  <Radio size='md' value='yes'>
                    Yes
                  </Radio>
                  <Radio size='md' value='no'>
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

export const ClubTokenForm = (props: any) => {
  const { dao, back, next } = props;
  const extension = findExtension(dao?.extensions, 'Governance Token');
  const transaction = useTransaction(extension?.tx_id);
  const data = useClubTokenStore((state) => state.token);
  const isTransferrable = useClubTokenStore(
    (state) => state.token.isTransferrable,
  );
  const members = useGlobalState((state) => state.club.members);
  const addMember = useGlobalState((state) => state.addMember);
  const removeMember = useGlobalState((state) => state.removeMember);
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
                          Token Metadata
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
                          <Stack spacing='3' direction='column'>
                            <FormControl id='member'>
                              <FormLabel
                                htmlFor='name'
                                fontWeight='light'
                                color='light.500'
                              >
                                STX Address
                              </FormLabel>
                              <Stack spacing='3'>
                                <Input
                                  placeholder='SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE'
                                  autoComplete='off'
                                  size='lg'
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      console.log(
                                        'value',
                                        e.currentTarget.value,
                                      );
                                      addMember(e.currentTarget.value);
                                      e.currentTarget.value = '';
                                    }
                                  }}
                                />
                                <FormHelperText fontWeight='light' color='gray'>
                                  Members will be minted a Club Pass and be able
                                  to deposit funds into the Club once live. At
                                  least 2 members are required.
                                </FormHelperText>
                                <HStack spacing={4}>
                                  <SimpleGrid columns={4} spacing={4}>
                                    {members.map(
                                      (member: string, index: number) => (
                                        <Tag
                                          key={index}
                                          size='lg'
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
                                      ),
                                    )}
                                  </SimpleGrid>
                                </HStack>
                              </Stack>
                            </FormControl>
                          </Stack>
                        </Stack>
                      </motion.div>
                    ) : null}
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
