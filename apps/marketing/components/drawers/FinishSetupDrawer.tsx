import React from 'react';
import type { ButtonProps } from '@chakra-ui/react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
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
              Extensions
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing='3'>
              <Alert
                status='warning'
                color='dark.900'
                borderRadius='lg'
                variant='subtle'
              >
                <AlertIcon />
                <AlertTitle>Required extensions</AlertTitle>
                <AlertDescription>
                  Follow the order below when deploying extensions.
                </AlertDescription>
              </Alert>
              <Accordion defaultIndex={[defaultStartingValue]}>
                <Stack spacing='6'>
                  <AccordionItem p='3'>
                    <Heading>
                      <AccordionButton>
                        <Text flex='1' textAlign='left' fontWeight='medium'>
                          1. NFT membership
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <Stack>
                        <Text>
                          Deploy your NFT Club Pass contract to mint NFTs for
                          your members.
                        </Text>
                        <DeployNFTButton
                          title='Deploy NFT Membership'
                          name='stackerdao-nft-membership'
                          clubId={clubId}
                          hasExtension={hasExtension('NFT Membership')}
                          variant='primary'
                          onFinish={onFinish}
                        />
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem p='3'>
                    <Heading>
                      <AccordionButton>
                        <Text flex='1' textAlign='left' fontWeight='medium'>
                          2. Governance token
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <Stack>
                        <Text>
                          Deploy your Governance token contract to mint tokens
                          for your members.
                        </Text>
                        <DeployGovernanceTokenButton
                          title='Deploy Governance Token'
                          name='stackerdao-governance-token'
                          clubId={clubId}
                          hasExtension={hasExtension('Governance Token')}
                          variant='primary'
                          onFinish={onFinish}
                        />
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem p='3'>
                    <Heading>
                      <AccordionButton>
                        <Text flex='1' textAlign='left' fontWeight='medium'>
                          3. Vault
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <Stack>
                        <Text>
                          Deploy your treasury vault contract to manage your
                          Clubs funds.
                        </Text>
                        <DeployVaultButton
                          title='Deploy Vault'
                          name='stackerdao-vault'
                          clubId={clubId}
                          hasExtension={hasExtension('Vault')}
                          variant='primary'
                          onFinish={onFinish}
                        />
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem p='3'>
                    <Heading>
                      <AccordionButton>
                        <Text flex='1' textAlign='left' fontWeight='medium'>
                          4. Investment Club
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <Stack>
                        <Text>
                          Deploy your investment club contract for distributing
                          and managing funds.
                        </Text>
                        <DeployICButton
                          title='Deploy Investment Club'
                          name='stackerdao-investment-club'
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
                          variant='primary'
                          onFinish={onFinish}
                        />
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem p='3'>
                    <Heading>
                      <AccordionButton>
                        <Text flex='1' textAlign='left' fontWeight='medium'>
                          5. Voting
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <Stack>
                        <Text>
                          Deploy your proposal voting contract for members to
                          vote on proposals.
                        </Text>
                        <DeployVotingButton
                          title='Deploy Voting'
                          name='stackerdao-voting'
                          clubId={clubId}
                          nftMembershipContractAddress={
                            nftExtension?.contract_address
                          }
                          governanceTokenContractAddress={
                            governanceExtension?.contract_address
                          }
                          hasExtension={hasExtension('Voting')}
                          variant='primary'
                          onFinish={onFinish}
                        />
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem p='3'>
                    <Heading>
                      <AccordionButton>
                        <Text flex='1' textAlign='left' fontWeight='medium'>
                          6. Submissions
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <Stack>
                        <Text>
                          Deploy your proposal submission contract for members
                          to submit proposals.
                        </Text>
                        <DeploySubmissionButton
                          title='Deploy Submission'
                          name='stackerdao-submission'
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
                          onFinish={onFinish}
                        />
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
