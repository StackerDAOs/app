import React from 'react';
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from 'ui';
import { useDAO } from 'ui/hooks';
import { SectionHeader } from 'ui/components/layout';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Card } from 'ui/components/cards';
import { LightningBolt, SwapArrows } from 'ui/components/icons';

export default function Extensions() {
  const dao = useDAO();
  const isActive = dao?.data?.active;

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
                Extensions are not active yet
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
        <Stack spacing='1'>
          <SectionHeader
            justify={{ base: 'flex-start', md: 'space-between' }}
            align={{ base: 'flex-start', md: 'space-between' }}
            color='light.900'
          >
            <Stack spacing='3'>
              <Text fontSize='md' fontWeight='light' color='text-muted'>
                Explore Contracts
              </Text>
              <Heading mt='0 !important' size='lg' fontWeight='medium'>
                Browse Extensions
              </Heading>
            </Stack>
          </SectionHeader>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing='6'>
            <Card h='fit-content' bg='dark.700'>
              <Stack spacing='0'>
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='2'
                >
                  <Stack spacing='1'>
                    <HStack align='baseline'>
                      <Circle bg='dark.500' size='7' mb='3'>
                        <Icon
                          as={LightningBolt}
                          boxSize='4'
                          color='primary.900'
                        />
                      </Circle>
                      <Heading
                        mt='0 !important'
                        size='sm'
                        fontWeight='semibold'
                      >
                        Buy &amp; Sell NFTs
                      </Heading>
                    </HStack>

                    <Text fontSize='md' fontWeight='thin' color='text-default'>
                      Buy and sell NFTs via proposal submissions.
                    </Text>
                  </Stack>
                  <Button variant='default' isDisabled>
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Card>
            <Card h='fit-content' bg='dark.700'>
              <Stack spacing='0'>
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='2'
                >
                  <Stack spacing='1'>
                    <HStack align='baseline'>
                      <Circle bg='dark.500' size='7' mb='3'>
                        <Icon as={SwapArrows} boxSize='4' color='primary.900' />
                      </Circle>
                      <Heading
                        mt='0 !important'
                        size='sm'
                        fontWeight='semibold'
                      >
                        Swap Tokens
                      </Heading>
                    </HStack>

                    <Text fontSize='md' fontWeight='thin' color='text-default'>
                      Bring DeFi to your team by adding token swap integration.
                    </Text>
                  </Stack>
                  <Button variant='default' isDisabled>
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Card>
            <Card h='fit-content' bg='dark.700'>
              <Stack spacing='0'>
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='2'
                >
                  <Stack spacing='1'>
                    <HStack align='baseline'>
                      <Circle bg='dark.500' size='7' mb='3'>
                        <Icon
                          as={LightningBolt}
                          boxSize='4'
                          color='primary.900'
                        />
                      </Circle>
                      <Heading
                        mt='0 !important'
                        size='sm'
                        fontWeight='semibold'
                      >
                        NFT Auction
                      </Heading>
                    </HStack>

                    <Text fontSize='md' fontWeight='thin' color='text-default'>
                      Auction off NFTs via the Gamma auction protocol.
                    </Text>
                  </Stack>
                  <Button variant='default' isDisabled>
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </SimpleGrid>
        </Stack>
      </Stack>
    </motion.div>
  );
}

Extensions.getLayout = (page: any) => (
  <DashboardLayout
    header={
      <Flex
        justify='space-between'
        align='center'
        borderBottomWidth='1px'
        borderBottomColor='dark.500'
        py='5'
        px='4'
      >
        <Heading size='md' fontWeight='black' letterSpacing='tight'>
          Extensions
        </Heading>
        <Button variant='default' size='sm' isDisabled>
          Add Extensions
        </Button>
      </Flex>
    }
  >
    {page}
  </DashboardLayout>
);
