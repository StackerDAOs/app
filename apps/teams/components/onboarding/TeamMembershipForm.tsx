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
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from 'ui';
import { useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { shortenAddress, validateStacksAddress } from '@stacks-os/utils';
import { useTeamMembershipStore } from 'store';
import { findExtension } from 'utils';
import Papa from 'papaparse';
import { CheckCircle, CheckIcon, UploadIcon } from 'ui/components/icons';

const FinishedState = ({ next, extension }: any) => (
  <Stack spacing='3' align='center' justify='center' h='75vh'>
    <Icon as={CheckCircle} color='primary.900' boxSize='12' />
    <Text fontSize='xl' fontWeight='bold' color='light.500' textAlign='center'>
      You&apos;re all set!
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

export const TeamMembershipForm = (props: any) => {
  const { dao, next } = props;
  const inputRef = React.useRef<any>(null);
  const extension = findExtension(dao?.extensions, 'Team');
  const transaction = useTransaction(extension?.tx_id);
  const members = useTeamMembershipStore((state) => state.team.members);
  const signalsRequired = useTeamMembershipStore(
    (state) => state.team.signalsRequired,
  );
  const updateSignalsRequired = useTeamMembershipStore(
    (state) => state.updateSignalsRequired,
  );
  const addMember = useTeamMembershipStore((state) => state.addMember);
  const removeMember = useTeamMembershipStore((state) => state.removeMember);

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
                          Team Members
                        </Text>
                        <Text color='light.500' fontSize='sm' maxW='lg'>
                          Add the addresses of your team members and set the
                          required number of signals to execute proposals.
                        </Text>
                      </Box>
                      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                        <GridItem colSpan={3}>
                          <FormControl id='member'>
                            <HStack
                              spacing='1'
                              align='baseline'
                              justify='space-between'
                            >
                              <FormLabel
                                htmlFor='name'
                                fontWeight='light'
                                color='light.500'
                              >
                                Member Address
                              </FormLabel>
                              <Button
                                variant='link'
                                color='gray'
                                size='sm'
                                leftIcon={<UploadIcon />}
                                onClick={handleFilePickerClick}
                              >
                                <Text
                                  as='span'
                                  fontSize='sm'
                                  fontWeight='light'
                                >
                                  Upload file
                                </Text>
                                <input
                                  type='file'
                                  ref={inputRef}
                                  onChange={handleFileUpload}
                                  style={{ display: 'none' }}
                                />
                              </Button>
                            </HStack>
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
                                No limit on the number of members.{' '}
                                {filename && (
                                  <HStack spacing='1' align='center'>
                                    <Icon as={CheckIcon} fontSize='sm' />
                                    <Text as='span' fontSize='sm'>
                                      {filename}
                                    </Text>
                                  </HStack>
                                )}
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
                        <GridItem colSpan={2}>
                          <FormControl id='signals-required'>
                            <FormLabel
                              htmlFor='signals-required'
                              fontWeight='light'
                              color='light.500'
                            >
                              Signals Required
                            </FormLabel>
                            <Input
                              placeholder='SCP'
                              autoComplete='off'
                              size='lg'
                              value={signalsRequired}
                              onChange={(e) =>
                                updateSignalsRequired(e.target.value)
                              }
                            />
                            <FormHelperText fontWeight='light' color='gray'>
                              The number of signatures required to approve a
                              proposal.
                            </FormHelperText>
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
