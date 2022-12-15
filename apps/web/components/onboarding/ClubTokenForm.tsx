import React from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from 'ui';
import { useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { useClubTokenStore } from 'store';
import { findExtension } from 'utils';
import { CheckCircle } from 'ui/components/icons';

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

export const ClubTokenForm = (props: any) => {
  const { dao, next } = props;
  const extension = findExtension(dao?.extensions, 'Governance Token');
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
                          Token Metadata
                        </Text>
                      </Box>
                      <NFTMetadataForm />
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
