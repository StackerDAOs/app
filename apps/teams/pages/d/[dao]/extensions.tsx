import React from 'react';
import {
  Button,
  Circle,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from 'ui';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { ExtensionsHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Card } from 'ui/components/cards';
import { LightningBolt, SwapArrows } from 'ui/components/icons';

export default function Extensions() {
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Wrapper>
        <Stack spacing='8' pb='16' mt='6'>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.25, type: 'linear' }}
          >
            <Stack spacing='6'>
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
                <Card h='fit-content' bg='dark.900'>
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

                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-default'
                        >
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
                            <Icon
                              as={SwapArrows}
                              boxSize='4'
                              color='primary.900'
                            />
                          </Circle>
                          <Heading
                            mt='0 !important'
                            size='sm'
                            fontWeight='semibold'
                          >
                            Swap Tokens
                          </Heading>
                        </HStack>

                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-default'
                        >
                          Bring DeFi to your team by adding token swap
                          integration.
                        </Text>
                      </Stack>
                      <Button variant='default' isDisabled>
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
                <Card h='fit-content' bg='dark.900'>
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

                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-default'
                        >
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
          </motion.div>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Extensions.getLayout = (page: any) => (
  <AppLayout header={<ExtensionsHeader />}>{page}</AppLayout>
);
