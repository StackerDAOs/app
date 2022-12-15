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
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from 'ui';
import { RadioButton, RadioButtonGroup } from 'ui/components/forms';
import { useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { useFundraiseStore } from 'store';
import { findExtension } from 'utils';
import { CheckCircle } from 'ui/components/icons';

const NameForm = () => {
  const minimumDeposit = useFundraiseStore((state) => state.minimumDeposit);
  const durationInDays = useFundraiseStore((state) => state.durationInDays);
  const multipleRoundsEnabled = useFundraiseStore(
    (state) => state.hasMultipleRoundsEnabled,
  );
  const fundraiseGoalAmount = useFundraiseStore(
    (state) => state.fundraiseGoalAmount,
  );
  const handleSelectMinimumDeposit = useFundraiseStore(
    (state) => state.updateMinimumDeposit,
  );
  const handleSelectDurationInDays = useFundraiseStore(
    (state) => state.updateDurationInDays,
  );
  const handleSelectMultipleRounds = useFundraiseStore(
    (state) => state.handleEnableMultipleRounds,
  );
  const handleUpdateGoalAmount = useFundraiseStore(
    (state) => state.updateFundraiseAmount,
  );

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap='8'>
      <GridItem colSpan={4}>
        <FormControl>
          <FormLabel htmlFor='minimumDeposit' fontWeight='light' color='gray'>
            Minimum deposit
          </FormLabel>
          <Select
            defaultValue='0'
            value={minimumDeposit}
            size='lg'
            color='white'
            bg='dark.900'
            borderColor='rgba(240, 246, 252, 0.1)'
            onChange={(e: any) => handleSelectMinimumDeposit(e.target.value)}
          >
            <option value='0'>0 STX</option>
            <option value='100'>100 STX</option>
            <option value='500'>500 STX</option>
            <option value='1000'>1,000 STX</option>
            <option value='10000'>10,000 STX</option>
          </Select>
          <FormHelperText fontWeight='light' color='gray'>
            Lowest acceptable deposit.
          </FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel htmlFor='durationInDays' fontWeight='light' color='gray'>
            Fundraising duration
          </FormLabel>
          <RadioButtonGroup
            defaultValue='1'
            size='lg'
            onChange={(value: any) => handleSelectDurationInDays(value)}
            value={durationInDays}
          >
            <RadioButton value='1'>1 day</RadioButton>
            <RadioButton value='7'>1 week</RadioButton>
            <RadioButton value='14'>2 weeks</RadioButton>
            <RadioButton value='30'>1 month</RadioButton>
          </RadioButtonGroup>
          <FormHelperText fontWeight='light' color='gray'>
            Once the club is deployed, this duration cannot be changed.
          </FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem colSpan={5}>
        <FormControl id='multiple-rounds'>
          <FormLabel
            htmlFor='cap'
            fontWeight='light'
            color='light.500'
            maxW='md'
          >
            Do you want to enable funding rounds in the future?
          </FormLabel>
          <ButtonGroup bg='base.900' borderRadius='lg' p='1' spacing='2'>
            <Stack align='center' direction='row' spacing='3'>
              <RadioGroup
                defaultValue='yes'
                onChange={(value: string) => handleSelectMultipleRounds(value)}
                value={multipleRoundsEnabled}
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
      </GridItem>
      <GridItem colSpan={4}>
        <Stack spacing='6' direction='column'>
          <Stack spacing='3' direction='column'>
            <FormControl id='member'>
              <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
                Fundraise Goal{' '}
              </FormLabel>
              <Stack spacing='3'>
                <Input
                  placeholder='0'
                  autoComplete='off'
                  size='lg'
                  onChange={(e: any) => handleUpdateGoalAmount(e.target.value)}
                  value={fundraiseGoalAmount}
                />
                <FormHelperText fontWeight='light' color='gray'>
                  Deposits going over this amount will still be accepted.
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

export const ClubFundraiseForm = (props: any) => {
  const { dao, next } = props;
  const extension = findExtension(dao?.extensions, 'Investment Club');
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
                        <Text fontSize='lg' fontWeight='medium'>
                          Fundraising Details
                        </Text>
                        <Text color='light.500' fontSize='sm' maxW='md'>
                          Your club will be able to open additional funding
                          rounds later.
                        </Text>
                      </Box>
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
