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
  Stack,
  Tag,
  Text,
} from 'ui';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { useClubTokenStore, useVotingStore } from 'store';
import { findExtension } from 'utils';
import { CheckCircle } from 'ui/components/icons';

const SelectVotingPowerForm = () => {
  const clubToken = useClubTokenStore((state) => state.token);

  const templateOptions = [
    {
      id: '1',
      name: clubToken?.name,
      description: `Your ${clubToken?.name} is the default voting power for your Club.`,
      isDisabled: false,
    },
  ];

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap='8'>
      <GridItem colSpan={2}>
        <RadioCardGroup
          defaultValue='1'
          onChange={() => {}}
          value='1'
          spacing='3'
          direction='row'
        >
          {templateOptions?.map((option) => (
            <RadioCard
              key={option.id}
              value={option.id}
              py='3'
              px='6'
              borderRadius='lg'
            >
              <Stack spacing='2'>
                <HStack spacing='3' align='flex-start'>
                  <Stack spacing='1'>
                    <Text
                      color='emphasized'
                      fontWeight='semibold'
                      fontSize='md'
                    >
                      {option.name}
                    </Text>
                    <Text color='light.500' fontSize='sm'>
                      {option.description}
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            </RadioCard>
          ))}
        </RadioCardGroup>
      </GridItem>
    </Grid>
  );
};

const NameForm = () => {
  const voting = useVotingStore((state) => state.voting);

  const handleSelectExecutionDelay = useVotingStore(
    (state) => state.handleEnableExecutionDelay,
  );

  const handleExecutionDelayInBlocks = useVotingStore(
    (state) => state.updateExecutionDelay,
  );

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap='8'>
      <GridItem colSpan={5}>
        <FormControl id='multiple-rounds'>
          <FormLabel
            htmlFor='cap'
            fontWeight='light'
            color='light.500'
            maxW='md'
          >
            Do you want to enable an execution delay on proposals?
          </FormLabel>
          <ButtonGroup bg='base.900' borderRadius='lg' p='1' spacing='2'>
            <Stack align='center' direction='row' spacing='3'>
              <RadioGroup
                defaultValue='yes'
                onChange={(value: string) => handleSelectExecutionDelay(value)}
                value={voting.hasExecutionDelay}
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
      <GridItem colSpan={4}>
        {voting.hasExecutionDelay === 'yes' && (
          <motion.div
            key={voting.hasExecutionDelay}
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.8, type: 'linear' }}
          >
            <Stack spacing='6' direction='column'>
              <Stack spacing='3' direction='column'>
                <FormControl id='member'>
                  <FormLabel
                    htmlFor='name'
                    fontWeight='light'
                    color='light.500'
                  >
                    Number of Blocks{' '}
                  </FormLabel>
                  <Stack spacing='3'>
                    <Input
                      placeholder='0'
                      autoComplete='off'
                      size='lg'
                      onChange={(e: any) =>
                        handleExecutionDelayInBlocks(e.target.value)
                      }
                      value={voting.executionDelayInBlocks}
                    />
                    <FormHelperText fontWeight='light' color='gray'>
                      For added security, the execution of the proposal will be
                      delayed by {voting.executionDelayInBlocks}. All proposals
                      must wait for this many blocks before they can be
                      executed.
                    </FormHelperText>
                  </Stack>
                </FormControl>
              </Stack>
            </Stack>
          </motion.div>
        )}
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

export const ClubVotingForm = (props: any) => {
  const { dao, next } = props;
  const extension = findExtension(dao?.extensions, 'Voting');
  const transaction = useTransaction(extension?.tx_id);

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
                        <Stack spacing='3'>
                          <Tag
                            color='orange.500'
                            bg='dark.800'
                            alignSelf='self-start'
                            size='sm'
                            borderRadius='3xl'
                          >
                            <Text as='span' fontWeight='regular'>
                              Additional selections coming soon
                            </Text>
                          </Tag>
                          <Text fontSize='lg' fontWeight='medium'>
                            Voting Details
                          </Text>
                        </Stack>
                        <Text color='light.500' fontSize='sm' maxW='md'>
                          Select the voting parameters for your Club.
                        </Text>
                      </Box>
                      <SelectVotingPowerForm />
                      <NameForm />
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
