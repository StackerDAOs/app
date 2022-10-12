import React from 'react';
import type { ButtonProps } from 'ui';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Heading,
  HStack,
  Icon,
  Stack,
  Square,
  Text,
  useDisclosure,
} from 'ui';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { GearIcon, LightningBolt } from 'ui/components/icons';

interface ProposalDrawerProps extends ButtonProps {
  title: string;
}

export const ProposalDrawer = (props: ProposalDrawerProps) => {
  const { title } = props;
  const [selected, setSelected] = React.useState('1');
  const focusField = React.useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const templateOptions = [
    {
      id: '1',
      icon: LightningBolt,
      name: 'Vault and asset management',
      description:
        'Transfer and manage your assets, add new tokens to whitelist, etc.',
    },
    {
      id: '2',
      icon: LightningBolt,
      name: 'NFT Marketplace',
      description:
        'List and sell your NFTs, create auctions, manage your collections, etc.',
    },
    {
      id: '3',
      icon: LightningBolt,
      name: 'Protocol upgrades',
      description:
        'Upgrade your protocol configuration, add new extensions, etc.',
    },
  ];

  return (
    <>
      <Button {...props} onClick={onOpen}>
        {title}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='lg'
        onClose={onClose}
        initialFocusRef={focusField}
      >
        <DrawerOverlay />
        <DrawerContent bg='dark.900'>
          <DrawerBody>
            <Stack
              spacing='6'
              px={{ base: '6', md: '8' }}
              py={{ base: '12', md: '16' }}
            >
              <Square
                size='12'
                bg='dark.500'
                color='inverted'
                borderRadius='lg'
              >
                <Icon
                  as={GearIcon}
                  boxSize={{ base: '6', md: '7' }}
                  color='primary.900'
                />
              </Square>
              <Stack>
                <Heading size='lg' fontWeight='black' color='light.900'>
                  Build your proposal
                </Heading>
                <Text
                  as='span'
                  cursor='pointer'
                  fontSize='md'
                  fontWeight='light'
                >
                  Start building out your proposal by choosing from the options
                  below.
                </Text>
              </Stack>
              <Stack spacing='3'>
                <RadioCardGroup
                  defaultValue={selected}
                  spacing='3'
                  onChange={(s) => setSelected(s)}
                >
                  {templateOptions?.map((option) => (
                    <RadioCard
                      key={option.id}
                      value={option.id}
                      p='5'
                      borderRadius='lg'
                    >
                      <HStack spacing='3'>
                        <Square
                          size='8'
                          bg='dark.500'
                          color='inverted'
                          borderRadius='lg'
                        >
                          <Icon
                            as={option.icon}
                            boxSize={{ base: '4', md: '5' }}
                            color='primary.900'
                          />
                        </Square>
                        <Stack spacing='0'>
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
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              </Stack>
              <Stack justify='flex-end' direction='row'>
                <Button
                  size='lg'
                  variant='default'
                  isLoading={false}
                  type='submit'
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
