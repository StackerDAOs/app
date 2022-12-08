import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
} from 'ui';
import { ConnectButton } from 'ui/components/buttons';
import { Step } from 'ui/components/feedback';
import { useTeam, useFormWizard } from 'ui/hooks';
import {
  TeamMembershipForm,
  TeamMembershipCard,
  TeamVaultForm,
  TeamVaultCard,
} from '@components/onboarding';
import { ChevronRight } from 'ui/components/icons';

const components = [
  {
    title: 'Create Team Membership',
    component: <TeamMembershipForm />,
  },
  {
    title: 'Create Team Vault',
    component: <TeamVaultForm />,
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
      return <TeamMembershipCard isLoading={isLoading} dao={dao} />;
    case 1:
      return <TeamVaultCard isLoading={isLoading} dao={dao} />;
    default:
      return <TeamMembershipCard isLoading={isLoading} dao={dao} />;
  }
};

export default function Extensions() {
  const dao = useTeam();
  const {
    setStep,
    step,
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
          <BreadcrumbItem
            color='gray'
            _hover={{
              color: 'light.900',
            }}
          >
            <BreadcrumbLink
              as={Link}
              href={`/create/${dao?.data?.slug}`}
              _hover={{
                textDecoration: 'none',
              }}
            >
              {dao?.data?.name || 'Team'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              href='#'
              _hover={{
                textDecoration: 'none',
              }}
            >
              Extensions
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack spacing='3'>
          {[0, 1].map((id) => (
            <Step
              key={id}
              cursor='pointer'
              isActive={currentStepIndex === id}
              isCompleted={currentStepIndex > id}
              isLastStep={id === 1}
              borderColor='secondary.900'
              onClick={() => setStep(id)}
            />
          ))}
        </HStack>
        <ConnectButton
          variant='secondary-inverted'
          size='sm'
          _hover={{ opacity: 0.9 }}
          _active={{ opacity: 1 }}
        />
      </Flex>
      <Stack spacing='8' px='16'>
        <Grid templateColumns='repeat(5, 1fr)'>
          <CurrentCard {...props} />
          <GridItem colSpan={3}>{currentElement}</GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
}
