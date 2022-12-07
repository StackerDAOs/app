import React from 'react';
import Link from 'next/link';
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
} from 'ui';
import { ConnectButton } from 'ui/components/buttons';
import { useTeam } from 'ui/hooks';
import { ArrowRight, ChevronRight } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { size } from 'lodash';

export default function Launch() {
  const dao = useTeam();
  const hasCompleted =
    !!dao?.data?.bootstrap_tx_id && !!dao?.data?.activation_tx_id;

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
          variant='secondary-inverted'
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
                bgGradient='linear(to-br, #7301fa 50%, #1c1f21 100%)'
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
                                  {size(dao?.data?.extensions) >= 2 ? (
                                    <Tag
                                      color='green.500'
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
                                  Team additional functionality. You must
                                  complete this step before you can launch your
                                  Team.
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
                                  {hasCompleted ? (
                                    <Tag
                                      color='green.500'
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
                                      Launch Team
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
                                  To launch, you need to deploy your final Team
                                  contract which will run the smart contract
                                  code that initializes and activates your Team.
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
