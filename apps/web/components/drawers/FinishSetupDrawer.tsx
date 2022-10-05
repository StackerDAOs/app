import React from 'react';
import type { ButtonProps } from 'ui';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from 'ui';
import {
  DeployNFTButton,
  DeployGovernanceTokenButton,
  DeployVaultButton,
  DeployICButton,
  DeploySubmissionButton,
  DeployVotingButton,
} from 'ui/components/buttons';
import { useDAO } from 'ui/hooks';
import { findExtension } from 'utils';
import { InfoIcon } from 'ui/components/icons';

export interface SetupDrawerProps extends ButtonProps {
  clubId: number;
  defaultStartingValue: number;
}

export const FinishSetupDrawer = (props: SetupDrawerProps) => {
  const { clubId, defaultStartingValue } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dao = useDAO();
  const onFinish = () => {
    console.log('onFinish');
  };
  const hasExtension = (extension: string) =>
    findExtension(dao.data?.extensions, extension);
  const nftExtension = findExtension(dao.data?.extensions, 'NFT Membership');
  const governanceExtension = findExtension(
    dao.data?.extensions,
    'Governance Token',
  );
  const vaultExtension = findExtension(dao.data?.extensions, 'Vault');
  const investmentClubExtension = findExtension(
    dao.data?.extensions,
    'Investment Club',
  );
  const votingExtension = findExtension(dao.data?.extensions, 'Voting');

  return (
    <>
      <Button {...props} onClick={onOpen}>
        Finish setup
      </Button>
      <Drawer isOpen={isOpen} placement='right' size='lg' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg='dark.900'>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size='lg' fontWeight='medium'>
              Extension Deployment
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing='3'>
              <Alert
                bg='dark.700'
                borderColor='dark.500'
                borderWidth='1px'
                color='light.900'
                status='warning'
                borderRadius='lg'
                variant='left-accent'
              >
                <AlertIcon />
                <AlertTitle>Required</AlertTitle>
                <AlertDescription>
                  Follow the order below when deploying extensions.
                </AlertDescription>
              </Alert>
              <Accordion defaultIndex={[defaultStartingValue]}>
                <Stack spacing='6'>
                  <AccordionItem p='3'>
                    <AccordionButton>
                      <HStack align='space-between'>
                        <Text
                          textAlign='left'
                          fontSize='lg'
                          fontWeight='regular'
                        >
                          <Text as='span' fontWeight='black'>
                            Step 1.
                          </Text>{' '}
                          Membership pass and governance token contracts
                        </Text>
                      </HStack>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack spacing='2'>
                        <Stack py={{ base: '3', md: '3' }} spacing='2'>
                          <SimpleGrid columns={2} spacing='4'>
                            <Stack align='flex-start' spacing='0'>
                              <Text
                                fontSize='md'
                                fontWeight='light'
                                color='gray'
                              >
                                Membership pass
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                {dao?.data?.name}
                              </Text>
                            </Stack>
                            <Stack align='flex-start' spacing='0'>
                              <HStack>
                                <Text
                                  fontSize='md'
                                  fontWeight='light'
                                  color='gray'
                                >
                                  Members
                                </Text>
                                <Icon as={InfoIcon} color='gray' />
                              </HStack>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                3
                              </Text>
                            </Stack>
                          </SimpleGrid>
                        </Stack>
                        <Stack justify='space-between' direction='row'>
                          <DeployNFTButton
                            title='Deploy NFT'
                            coreDao={dao?.data?.contract_address}
                            name={`${dao?.data?.slug}-nft-membership-pass`}
                            clubId={clubId}
                            hasExtension={hasExtension('NFT Membership')}
                            variant='primary'
                            onDeploy={onFinish}
                          />
                        </Stack>
                        <Stack py={{ base: '3', md: '3' }} spacing='2'>
                          <SimpleGrid columns={2} spacing='4'>
                            <Stack align='flex-start' spacing='0'>
                              <Text
                                fontSize='md'
                                fontWeight='light'
                                color='gray'
                              >
                                Token name
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                {dao?.data?.name}
                              </Text>
                            </Stack>
                            <Stack align='flex-start' spacing='0'>
                              <Text
                                fontSize='md'
                                fontWeight='light'
                                color='gray'
                              >
                                Token symbol
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                {dao?.data?.config?.tokenSymbol}
                              </Text>
                            </Stack>
                          </SimpleGrid>
                        </Stack>
                        <Stack justify='space-between' direction='row'>
                          <DeployGovernanceTokenButton
                            title='Deploy Token'
                            coreDao={dao?.data?.contract_address}
                            name={`${dao?.data?.slug}-governance-token`}
                            symbol={dao?.data?.config?.tokenSymbol}
                            clubId={clubId}
                            hasExtension={hasExtension('Governance Token')}
                            variant='primary'
                            onDeploy={onFinish}
                          />
                        </Stack>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem p='3'>
                    <AccordionButton>
                      <HStack align='space-between'>
                        <Text
                          textAlign='left'
                          fontSize='lg'
                          fontWeight='regular'
                        >
                          <Text as='span' fontWeight='black'>
                            Step 2.
                          </Text>{' '}
                          Vault and investment club specific contracts
                        </Text>
                      </HStack>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack spacing='2'>
                        <Stack py={{ base: '3', md: '3' }} spacing='2'>
                          <SimpleGrid columns={2} spacing='4'>
                            <Stack align='flex-start' spacing='0'>
                              <HStack>
                                <Text
                                  fontSize='md'
                                  fontWeight='light'
                                  color='gray'
                                >
                                  Whitelisted assets
                                </Text>
                                <Icon as={InfoIcon} color='gray' />
                              </HStack>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                NA
                              </Text>
                            </Stack>
                          </SimpleGrid>
                        </Stack>
                        <Stack justify='space-between' direction='row'>
                          <DeployVaultButton
                            title='Deploy Vault'
                            coreDao={dao?.data?.contract_address}
                            name={`${dao?.data?.slug}-vault`}
                            clubId={clubId}
                            hasExtension={hasExtension('Vault')}
                            variant='primary'
                            onDeploy={onFinish}
                          />
                        </Stack>
                        <Stack py={{ base: '3', md: '3' }} spacing='2'>
                          <SimpleGrid columns={2} spacing='4'>
                            <Stack align='flex-start' spacing='0'>
                              <Text
                                fontSize='md'
                                fontWeight='light'
                                color='gray'
                              >
                                Minimum deposit
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                {dao?.data?.config?.minimumDeposit} STX
                              </Text>
                            </Stack>
                            <Stack align='flex-start' spacing='0'>
                              <Text
                                fontSize='md'
                                fontWeight='light'
                                color='gray'
                              >
                                Fundraising duration
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                ~ {dao?.data?.config?.durationInDays} days
                              </Text>
                            </Stack>
                          </SimpleGrid>
                        </Stack>
                        <Stack justify='space-between' direction='row'>
                          <DeployICButton
                            coreDao={dao?.data?.contract_address}
                            title='Deploy Investment Club'
                            name={`${dao?.data?.slug}-investment-club`}
                            clubId={clubId}
                            nftMembershipContractAddress={
                              nftExtension?.contract_address
                            }
                            governanceTokenContractAddress={
                              governanceExtension?.contract_address
                            }
                            vaultContractAddress={
                              vaultExtension?.contract_address
                            }
                            hasExtension={hasExtension('Investment Club')}
                            startWindow={dao?.data?.config?.durationInDays}
                            minimumDeposit={dao?.data?.config?.minimumDeposit}
                            variant='primary'
                            onDeploy={onFinish}
                          />
                        </Stack>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem p='3'>
                    <AccordionButton>
                      <HStack align='space-between'>
                        <Text
                          textAlign='left'
                          fontSize='lg'
                          fontWeight='regular'
                        >
                          <Text as='span' fontWeight='black'>
                            Step 3.
                          </Text>{' '}
                          Governance contracts for submitting and voting on
                          proposals
                        </Text>
                      </HStack>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Stack spacing='2'>
                        <Stack py={{ base: '3', md: '3' }} spacing='2'>
                          <SimpleGrid columns={2} spacing='4'>
                            <Stack align='flex-start' spacing='0'>
                              <HStack>
                                <Text
                                  fontSize='md'
                                  fontWeight='light'
                                  color='gray'
                                >
                                  Execution delay
                                </Text>
                                <Icon as={InfoIcon} color='gray' />
                              </HStack>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                ~ 12 hours
                              </Text>
                            </Stack>
                          </SimpleGrid>
                        </Stack>
                        <Stack justify='space-between' direction='row'>
                          <DeployVotingButton
                            title='Deploy Voting'
                            coreDao={dao?.data?.contract_address}
                            name={`${dao?.data?.slug}-voting`}
                            clubId={clubId}
                            nftMembershipContractAddress={
                              nftExtension?.contract_address
                            }
                            governanceTokenContractAddress={
                              governanceExtension?.contract_address
                            }
                            hasExtension={hasExtension('Voting')}
                            variant='primary'
                            onDeploy={onFinish}
                          />
                        </Stack>
                        <Stack py={{ base: '3', md: '3' }} spacing='2'>
                          <SimpleGrid columns={2} spacing='4'>
                            <Stack align='flex-start' spacing='0'>
                              <Text
                                fontSize='md'
                                fontWeight='light'
                                color='gray'
                              >
                                Proposal duration
                              </Text>
                              <Text
                                fontSize='lg'
                                fontWeight='black'
                                color='white'
                              >
                                ~ 3 days
                              </Text>
                            </Stack>
                          </SimpleGrid>
                        </Stack>
                        <Stack justify='space-between' direction='row'>
                          <DeploySubmissionButton
                            title='Deploy Submission'
                            coreDao={dao?.data?.contract_address}
                            name={`${dao?.data?.slug}-submission`}
                            clubId={clubId}
                            nftMembershipContractAddress={
                              nftExtension?.contract_address
                            }
                            investmentClubContractAddress={
                              investmentClubExtension?.contract_address
                            }
                            votingContractAddress={
                              votingExtension?.contract_address
                            }
                            hasExtension={hasExtension('Submission')}
                            variant='primary'
                            onDeploy={onFinish}
                          />
                        </Stack>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Stack>
              </Accordion>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
