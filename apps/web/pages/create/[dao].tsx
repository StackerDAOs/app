import React from 'react';
import Link from 'next/link';
import {
  ButtonGroup,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Circle,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Progress,
  Stack,
  Tag,
  Text,
} from 'ui';
import { Card } from 'ui/components/cards';
import { ConnectButton } from 'ui/components/buttons';
import { Step } from 'ui/components/feedback';
import { useDAO, useFormWizard } from 'ui/hooks';
import {
  ClubMembershipPassForm,
  ClubMembershipCard,
  ClubTokenCard,
  ClubVaultCard,
  ClubTokenForm,
  ClubVaultForm,
  ClubFundraiseCard,
  ClubFundraiseForm,
  ClubSubmissionCard,
  ClubSubmissionForm,
  ClubVotingCard,
  ClubVotingForm,
} from '@components/onboarding';
import { Notification } from '@components/feedback';
import {
  ArrowRight,
  ChevronRight,
  HomeOutline,
  XIcon,
} from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { getPercentage } from 'utils';
import { size } from 'lodash';

const components = [
  {
    title: 'Create Membership Pass',
    component: <ClubMembershipPassForm />,
  },
  {
    title: 'Create Token',
    component: <ClubTokenForm />,
  },
  {
    title: 'Create Vault',
    component: <ClubVaultForm />,
  },
  {
    title: 'Create Fundraise',
    component: <ClubFundraiseForm />,
  },
  {
    title: 'Create Voting',
    component: <ClubVotingForm />,
  },
  {
    title: 'Create Submission',
    component: <ClubSubmissionForm />,
  },
];

const CurrentCard = ({
  dao,
  currentStep,
  isLoading,
}: {
  dao: any;
  currentStep: number;
  isLoading: boolean;
}) => {
  switch (currentStep) {
    case 0:
      return <ClubMembershipCard isLoading={isLoading} dao={dao} />;
    case 1:
      return <ClubTokenCard isLoading={isLoading} dao={dao} />;
    case 2:
      return <ClubVaultCard isLoading={isLoading} dao={dao} />;
    case 3:
      return <ClubFundraiseCard isLoading={isLoading} dao={dao} />;
    case 4:
      return <ClubVotingCard isLoading={isLoading} dao={dao} />;
    case 5:
      return <ClubSubmissionCard isLoading={isLoading} dao={dao} />;
    default:
      return <ClubMembershipCard isLoading={isLoading} dao={dao} />;
  }
};

export default function Launch() {
  const dao = useDAO();
  const {
    setStep,
    formValues,
    step,
    steps,
    isFirstStep,
    canGoToNextStep,
    currentStepIndex,
    back,
    next,
  } = useFormWizard(components);
  const props = {
    dao: dao.data,
    isLoading: dao.isLoading,
    isFirstStep,
    canGoToNextStep,
    currentStep: currentStepIndex,
    back,
    next,
  };
  const currentElement = React.cloneElement(step.component, props);

  return (
    <Stack spacing='10'>
      <Flex
        justify='space-between'
        align='center'
        bg='dark.800'
        borderBottomWidth='1px'
        borderBottomColor='dark.500'
        py='4'
        px='16'
      >
        <Breadcrumb spacing='2' separator={<ChevronRight fontSize='sm' />}>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              href='#'
              _hover={{
                textDecoration: 'none',
              }}
            >
              {dao?.data?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <ConnectButton
          variant='inverted'
          size='sm'
          _hover={{ opacity: 0.9 }}
          _active={{ opacity: 1 }}
        />
      </Flex>
      <Stack as={Flex} justify='center' align='center' h='75vh' bg='dark.900'>
        <Stack spacing='8' px='16'>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.8, type: 'linear' }}
          >
            <Stack spacing={{ base: '6', md: '6' }} maxW='2xl'>
              <Text
                lineHeight='1'
                as='h1'
                fontSize='7xl'
                letterSpacing='tight'
                fontWeight='black'
                bgGradient='linear(to-br, #624AF2 50%, #1c1f21 100%)'
                bgClip='text'
              >
                {dao?.data?.name}{' '}
                <Text
                  as='span'
                  fontWeight='thin'
                  letterSpacing='wide'
                  color='gray'
                >
                  Launchpad
                </Text>
              </Text>
            </Stack>
          </motion.div>
          <Stack spacing='8'>
            <Link href={`/create/${dao?.data?.slug}/extensions`}>
              <Stack spacing='0' cursor='pointer'>
                <Stack spacing='2'>
                  <Stack spacing='3'>
                    <Stack spacing='0'>
                      <Grid templateColumns='repeat(5, 1fr)' gap={8}>
                        <GridItem colSpan={{ base: 2, md: 4 }}>
                          <Stack spacing='1'>
                            <HStack align='flex-start' spacing='4'>
                              <Stack spacing='1' maxW='lg' align='flex-start'>
                                <Stack spacing='3'>
                                  {size(dao?.data?.extensions) >= 6 ? (
                                    <Tag
                                      color='primary.500'
                                      bg='dark.800'
                                      alignSelf='self-start'
                                      size='sm'
                                      borderRadius='3xl'
                                    >
                                      <Text as='span' fontWeight='regular'>
                                        Complete
                                      </Text>
                                    </Tag>
                                  ) : (
                                    <Tag
                                      color='yellow.500'
                                      bg='dark.800'
                                      alignSelf='self-start'
                                      size='sm'
                                      borderRadius='3xl'
                                    >
                                      <Text as='span' fontWeight='regular'>
                                        Incomplete
                                      </Text>
                                    </Tag>
                                  )}
                                  <HStack>
                                    <Heading size='md' fontWeight='black'>
                                      Add &amp; Deploy Extensions
                                    </Heading>
                                    <Button
                                      variant='link'
                                      rightIcon={
                                        <Icon
                                          as={ArrowRight}
                                          color='light.900'
                                          fontSize='2xl'
                                        />
                                      }
                                    />
                                  </HStack>
                                </Stack>
                                <Text
                                  fontSize='sm'
                                  fontWeight='light'
                                  color='gray'
                                >
                                  Extensions are smart contracts that give your
                                  Club additional functionality. You must
                                  complete this step before you can launch your
                                  Club.
                                </Text>
                              </Stack>
                            </HStack>
                          </Stack>
                        </GridItem>
                      </Grid>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Link>
            <Link href={`/create/${dao?.data?.slug}/launch`}>
              <Stack spacing='0' cursor='pointer'>
                <Stack spacing='2'>
                  <Stack spacing='3'>
                    <Stack spacing='0'>
                      <Grid templateColumns='repeat(5, 1fr)' gap={8}>
                        <GridItem colSpan={{ base: 2, md: 4 }}>
                          <Stack spacing='1'>
                            <HStack align='flex-start' spacing='4'>
                              <Stack spacing='1' maxW='lg' align='flex-start'>
                                <Stack spacing='3'>
                                  <Tag
                                    color='yellow.500'
                                    bg='dark.800'
                                    alignSelf='self-start'
                                    size='sm'
                                    borderRadius='3xl'
                                  >
                                    <Text as='span' fontWeight='regular'>
                                      Incomplete
                                    </Text>
                                  </Tag>
                                  <HStack>
                                    <Heading size='md' fontWeight='black'>
                                      Launch Club
                                    </Heading>
                                    <Button
                                      variant='link'
                                      rightIcon={
                                        <Icon
                                          as={ArrowRight}
                                          color='light.900'
                                          fontSize='2xl'
                                        />
                                      }
                                    />
                                  </HStack>
                                </Stack>
                                <Text
                                  fontSize='sm'
                                  fontWeight='light'
                                  color='gray'
                                >
                                  To launch, you need to deploy your final Club
                                  contract which will run the smart contract
                                  code that initializes and activates your Club.
                                </Text>
                              </Stack>
                            </HStack>
                          </Stack>
                        </GridItem>
                      </Grid>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
