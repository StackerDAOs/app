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
  Icon,
  Input,
  Stack,
  Text,
} from 'ui';
import { RadioButton, RadioButtonGroup } from 'ui/components/forms';
import { useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { useSubmissionStore } from 'store';
import { findExtension, estimateDays } from 'utils';
import { CheckCircle } from 'ui/components/icons';

const NameForm = () => {
  const submission = useSubmissionStore((state) => state.submission);

  const handleMinStartBlock = useSubmissionStore(
    (state) => state.updateMinimumStartDelay,
  );

  const handleMaxStartBlock = useSubmissionStore(
    (state) => state.updateMaximumStartDelay,
  );

  return (
    <Grid templateColumns='repeat(6, 1fr)' gap='8'>
      <GridItem colSpan={3}>
        <Stack spacing='6' direction='column'>
          <Stack spacing='3' direction='column'>
            <FormControl id='min-block'>
              <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
                Minimum Start Block{' '}
              </FormLabel>
              <Stack spacing='3'>
                <Input
                  placeholder='0'
                  autoComplete='off'
                  size='lg'
                  onChange={(e: any) => handleMinStartBlock(e.target.value)}
                  value={submission.minimumProposalStartDelay}
                />
                <FormHelperText fontWeight='light' color='gray'>
                  This requires all proposals to wait ~{' '}
                  {estimateDays(Number(submission.minimumProposalStartDelay))}{' '}
                  days before voting begins.
                </FormHelperText>
              </Stack>
            </FormControl>
          </Stack>
        </Stack>
      </GridItem>
      <GridItem colSpan={3}>
        <Stack spacing='6' direction='column'>
          <Stack spacing='3' direction='column'>
            <FormControl id='max-block'>
              <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
                Maximum Start Block{' '}
              </FormLabel>
              <Stack spacing='3'>
                <Input
                  placeholder='0'
                  autoComplete='off'
                  size='lg'
                  onChange={(e: any) => handleMaxStartBlock(e.target.value)}
                  value={submission.maximumProposalStartDelay}
                />
                <FormHelperText fontWeight='light' color='gray'>
                  This requires all proposals must go live for a vote within ~{' '}
                  {estimateDays(Number(submission.maximumProposalStartDelay))}{' '}
                  days.
                </FormHelperText>
              </Stack>
            </FormControl>
          </Stack>
        </Stack>
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

export const ClubSubmissionForm = (props: any) => {
  const { dao, next } = props;
  const extension = findExtension(dao?.extensions, 'Submission');
  const transaction = useTransaction(extension?.tx_id);
  const submissionStore = useSubmissionStore((state) => state.submission);
  const handleSelectProposalDuration = useSubmissionStore(
    (state) => state.updateProposalDuration,
  );

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
                        <Text fontSize='lg' fontWeight='medium'>
                          Submission Details
                        </Text>
                        <Text color='light.500' fontSize='sm' maxW='md'>
                          Select the submission parameters for your Club.
                        </Text>
                      </Box>
                      <Grid templateColumns='repeat(5, 1fr)' gap='8'>
                        <GridItem colSpan={5}>
                          <FormControl>
                            <FormLabel
                              htmlFor='durationInDays'
                              fontWeight='light'
                              color='gray'
                            >
                              Proposal duration
                            </FormLabel>
                            <RadioButtonGroup
                              defaultValue='1'
                              size='lg'
                              onChange={(value: any) => {
                                handleSelectProposalDuration(value);
                              }}
                              value={submissionStore.proposalDuration}
                            >
                              <RadioButton value='144'>1 day</RadioButton>
                              <RadioButton value='288'>2 days</RadioButton>
                              <RadioButton value='432'>3 days</RadioButton>
                              <RadioButton value='1008'>1 week</RadioButton>
                            </RadioButtonGroup>
                            <FormHelperText fontWeight='light' color='gray'>
                              This can be changed later via a proposal passed by
                              the Club members.
                            </FormHelperText>
                          </FormControl>
                        </GridItem>
                      </Grid>
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
