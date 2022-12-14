import React from 'react';
import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Tag,
} from 'ui';
import { DashboardLayout } from '@components/layout';
import { SectionHeader } from 'ui/components/layout';
import { Card } from 'ui/components/cards';
import { useTeam } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { map } from 'lodash';
import { LightningBolt, SwapArrows } from 'ui/components/icons';
import { truncateAddress } from '@stacks-os/utils';

const extensionOptions = [
  {
    id: '1',
    icon: LightningBolt,
    name: 'Buy & Sell NFTs',
    description: 'Buy and sell NFTs via proposal submissions.',
  },
  {
    id: '2',
    icon: SwapArrows,
    name: 'Swap Tokens',
    description: 'Bring DeFi to your team with token swapping .',
  },
  {
    id: '3',
    icon: LightningBolt,
    name: 'NFT Auction',
    description: 'Auction off NFTs via the Gamma protocol.',
  },
  {
    id: '4',
    icon: LightningBolt,
    name: 'Stacking',
    description: 'Stacks STX through Friedger Pool.',
  },
  {
    id: '5',
    icon: LightningBolt,
    name: 'CityCoins Stacking',
    description: 'Stack MIA or NYC through the CityCoins protocol.',
  },
  {
    id: '6',
    icon: LightningBolt,
    name: 'CityCoins Mining',
    description: 'Mine MIA or NYC through the CityCoins protocol.',
  },
];

export default function Extensions() {
  const dao = useTeam();
  const isActive = dao?.data?.active;
  const extensions = dao?.data?.extensions;

  if (!isActive) {
    return (
      <Stack align='center' justify='center' h='75vh'>
        <Card bg='dark.900' border='1px solid' borderColor='dark.500' w='25vw'>
          <Box
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
            bg='dark.700'
            borderTopLeftRadius='lg'
            borderTopRightRadius='lg'
          >
            <HStack justify='center'>
              <Text fontSize='md' fontWeight='medium' color='light.900'>
                Vault is not active yet
              </Text>
            </HStack>
          </Box>
          <Stack
            spacing={{ base: '0', md: '1' }}
            justify='center'
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
          >
            <Stack spacing='3'>
              <HStack justify='center' cursor='default'>
                <Button variant='default' size='sm' isDisabled>
                  Activate
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing='8'>
            <Grid templateColumns='repeat(10, 1fr)' gap={8}>
              {map(extensions, (extension) => (
                <GridItem colSpan={5}>
                  <Card bg='dark.800'>
                    <Grid
                      templateColumns='repeat(5, 1fr)'
                      gap={8}
                      alignItems='center'
                      p={{ base: '6', md: '6' }}
                    >
                      <GridItem colSpan={{ base: 2, md: 4 }}>
                        <Stack spacing='2'>
                          <Tag
                            color='green.500'
                            bg='dark.800'
                            alignSelf='self-start'
                            size='sm'
                            borderRadius='3xl'
                          >
                            <Text as='span' fontWeight='regular'>
                              Enabled
                            </Text>
                          </Tag>
                          <HStack align='flex-start' spacing='4'>
                            <Stack spacing='1' maxW='lg'>
                              <Heading size='md' fontWeight='black'>
                                {extension?.extension_types?.name}
                              </Heading>
                              <Text
                                fontSize='sm'
                                fontWeight='light'
                                color='gray'
                              >
                                {truncateAddress(extension?.contract_address)}
                              </Text>
                            </Stack>
                          </HStack>
                        </Stack>
                      </GridItem>
                    </Grid>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Stack>
        <Stack spacing='3'>
          <SectionHeader
            justify={{ base: 'flex-start', md: 'space-between' }}
            align={{ base: 'flex-start', md: 'space-between' }}
            color='light.900'
          >
            <Stack spacing='3'>
              <Heading
                color='light.900'
                fontSize='xl'
                fontWeight='medium'
                letterSpacing='tight'
              >
                Extensions
              </Heading>
            </Stack>
          </SectionHeader>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing='6'>
            {map(extensionOptions, (extension) => (
              <Card h='fit-content' bg='dark.900'>
                <Stack spacing='0'>
                  <Stack
                    px={{ base: '6', md: '6' }}
                    py={{ base: '6', md: '6' }}
                    spacing='3'
                  >
                    <Stack spacing='1' align='center'>
                      <Circle bg='dark.500' size='8' mb='3'>
                        <Icon
                          as={extension?.icon}
                          boxSize='4'
                          color='primary.900'
                        />
                      </Circle>
                      <HStack align='baseline'>
                        <Heading size='sm' fontWeight='semibold'>
                          {extension?.name}
                        </Heading>
                      </HStack>
                      <Text
                        fontSize='sm'
                        fontWeight='regular'
                        color='gray'
                        textAlign='center'
                      >
                        {extension?.description}
                      </Text>
                    </Stack>
                    <Button variant='secondary' size='sm' isDisabled>
                      Add
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </motion.div>
  );
}

Extensions.getLayout = (page: any) => (
  <DashboardLayout
    header={
      <Flex justify='space-between' align='center' py='6' px='4'>
        <Heading size='lg' fontWeight='black' letterSpacing='tight'>
          Extensions
        </Heading>
      </Flex>
    }
  >
    {page}
  </DashboardLayout>
);
