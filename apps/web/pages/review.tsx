import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Circle,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { useSteps, useLaunchForm } from 'ui/store';
import { DeployCoreButton } from 'ui/components/buttons';
import { useTransaction } from 'ui/hooks';
import { LightningBolt } from 'ui/components/icons';
import { LaunchLayout } from '../components/layout';

export default function Review() {
  const router = useRouter();
  const [transactionId, setTransactionId] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentStep, setStep } = useSteps();
  const { clubInfo, clubDetails } = useLaunchForm();
  const { data: transaction } = useTransaction(transactionId);

  const handleGoBack = () => {
    setStep(currentStep - 1);
    router.push('/add-members');
  };

  const handleOnFinish = (data: any) => {
    setTransactionId(data.txId);
    onOpen();
  };

  React.useEffect(() => {
    setStep(3);
  }, []);

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.8, type: 'linear' }}
    >
      <Stack
        display='flex'
        justify='center'
        h='calc(100vh - 7px)'
        backgroundImage='radial-gradient(#2e3336 0.75px, transparent 0.75px), radial-gradient(#2e3336 0.75px, #111111 0.75px)'
        backgroundSize='30px 30px'
        backgroundPosition='0 0, 15px 15px'
      >
        <Container maxW='3xl'>
          <SectionHeader justify='flex-start' align='center' color='white'>
            <Stack spacing='2'>
              <HStack spacing='2'>
                <Stack
                  width='35px'
                  height='35px'
                  borderRadius='25%'
                  fontWeight='bold'
                  justify='center'
                  align='center'
                  bg='bg-primary'
                >
                  <Text color='white' fontWeight='bold' fontSize='lg'>
                    4
                  </Text>
                </Stack>
                <Heading
                  size='lg'
                  fontWeight='extrabold'
                  lineHeight='1.5'
                  letterSpacing='tight'
                  color='white'
                >
                  Review{' '}
                  <Text as='span' maxW='xl' mx='auto' color='gray'>
                    &amp; Deploy
                  </Text>
                </Heading>
              </HStack>
              <Text fontSize='md' maxW='xl' mx='auto' color='white'>
                Time to review your Club and deploy it to the world!
              </Text>
            </Stack>
          </SectionHeader>
          <Stack spacing='8'>
            <SimpleGrid columns={2} spacing='4'>
              <Stack align='flex-start' spacing='0'>
                <Text fontSize='md' color='gray'>
                  Name
                </Text>
                <Text fontSize='md' fontWeight='semibold' color='white'>
                  {clubInfo?.name}
                </Text>
              </Stack>
              <Stack align='flex-start' spacing='0'>
                <Text fontSize='md' color='gray'>
                  Open to deposits for
                </Text>
                <Text fontSize='md' fontWeight='semibold' color='white'>
                  ~ {clubDetails?.duration} days
                </Text>
              </Stack>
              <Stack align='flex-start' spacing='0'>
                <Text fontSize='md' color='gray'>
                  Total members
                </Text>
                <Text fontSize='md' fontWeight='semibold' color='white'>
                  {clubInfo?.totalMembers || 3}
                </Text>
              </Stack>
              <Stack align='flex-start' spacing='0'>
                <Text fontSize='md' color='gray'>
                  Minimum deposit
                </Text>
                <Text fontSize='md' fontWeight='semibold' color='white'>
                  {clubDetails?.minimum} STX
                </Text>
              </Stack>
            </SimpleGrid>
            <Stack justify='space-between' direction='row'>
              <Button
                size='lg'
                variant='link'
                onClick={handleGoBack}
                isLoading={false}
                type='submit'
              >
                Back
              </Button>
              <Link href={`/d/${clubInfo?.name}`}>
                <DeployCoreButton
                  title='Deploy'
                  name='StackerDAO'
                  slug='stackerdao'
                  size='lg'
                  variant='primary'
                  isLoading={false}
                  onFinish={handleOnFinish}
                />
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg='dark.800' borderColor='dark.500' borderWidth='1px'>
          <ModalBody>
            <Stack spacing='0'>
              {transaction?.tx_status === 'pending' ? (
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='2'
                  align='center'
                >
                  <Circle bg='dark.500' size='14' mb='3'>
                    <Icon as={LightningBolt} boxSize='8' color='primary.900' />
                  </Circle>
                  <Stack spacing='3'>
                    <Heading mt='0 !important' size='md' fontWeight='medium'>
                      Your transaction is pending
                    </Heading>
                  </Stack>
                  <Text
                    fontSize='md'
                    fontWeight='thin'
                    color='text-muted'
                    textAlign='center'
                  >
                    Once your transaction is confirmed, your Club dashboard will
                    be available.
                  </Text>
                </Stack>
              ) : (
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='2'
                  align='center'
                >
                  <Circle bg='dark.500' size='14' mb='3'>
                    <Icon as={LightningBolt} boxSize='8' color='primary.900' />
                  </Circle>
                  <Stack spacing='3'>
                    <Heading mt='0 !important' size='md' fontWeight='medium'>
                      Your transaction is confirmed
                    </Heading>
                  </Stack>
                  <Text
                    fontSize='md'
                    fontWeight='thin'
                    color='text-muted'
                    textAlign='center'
                  >
                    Go to the {clubInfo?.name} Dashboard to finish your club
                    setup.
                  </Text>
                </Stack>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            {transaction?.tx_status === 'pending' ? (
              <Stack>
                <Button variant='default' isFullWidth>
                  <Spinner size='xs' mr='2' />
                </Button>
                <Text
                  fontSize='sm'
                  fontWeight='light'
                  color='text-muted'
                  textAlign='center'
                >
                  Do not refresh the page or close this window until your
                  transaction is confirmed.
                </Text>
              </Stack>
            ) : (
              <Link href={`/d/${clubInfo?.name}`}>
                <Button variant='primary' isFullWidth>
                  Go to your dashboard
                </Button>
              </Link>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
}

Review.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
