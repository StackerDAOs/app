import React from 'react';
import Link from 'next/link';
import {
  Badge,
  Button,
  Heading,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from 'ui';
import { useProposals } from 'ui/hooks';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { VotingHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { EmptyState } from '@components/misc';
import { Card } from 'ui/components/cards';
import { capitalize, map, truncate } from 'lodash';
import { ArrowRight } from 'ui/components/icons';

const MotionGrid = motion(SimpleGrid);

export default function Proposals() {
  const [isHovered, setHovered] = React.useState(false);
  const [filter, setFilter] = React.useState('recent');
  const proposals = useProposals();

  if (proposals.isLoading || proposals?.isFetching || proposals?.isIdle) {
    return null;
  }

  if (proposals?.data?.length === 0) {
    return (
      <Stack spacing='8' pb='16' mt='6'>
        <motion.div
          variants={FADE_IN_VARIANTS}
          initial={FADE_IN_VARIANTS.hidden}
          animate={FADE_IN_VARIANTS.enter}
          exit={FADE_IN_VARIANTS.exit}
          transition={{ duration: 0.25, type: 'linear' }}
        >
          <Stack spacing='0'>
            <Stack
              px={{ base: '6', md: '6' }}
              py={{ base: '6', md: '6' }}
              spacing='2'
            >
              <EmptyState align='center' textAlign='center' spacing='3'>
                <Stack spacing='1'>
                  <Heading size='md' fontWeight='light'>
                    No proposals found
                  </Heading>
                  <Text color='gray' maxW='md'>
                    You can start by submitting a proposal here.
                  </Text>
                </Stack>
                <Button variant='default'>Create proposal</Button>
              </EmptyState>
            </Stack>
          </Stack>
        </motion.div>
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
      <Wrapper>
        <Stack spacing='1'>
          <SectionHeader
            justify={{ base: 'flex-start', md: 'space-between' }}
            align={{ base: 'flex-start', md: 'space-between' }}
            color='light.900'
          >
            <Stack spacing='3'>
              <Text fontSize='md' fontWeight='light' color='text-muted'>
                Explore Submissions
              </Text>
              <Heading mt='0 !important' size='lg' fontWeight='medium'>
                Proposals
              </Heading>
            </Stack>
            <Stack align='center' direction='row' spacing='3'>
              <RadioGroup onChange={setFilter} value={filter}>
                <Stack direction='row'>
                  {map(
                    ['recent', 'most popular', 'submitted'],
                    (tab: string) => (
                      <Radio size='md' value={tab} _focus={{ outline: 'none' }}>
                        {capitalize(tab)}
                      </Radio>
                    ),
                  )}
                </Stack>
              </RadioGroup>
            </Stack>
          </SectionHeader>
          <Stack spacing='8' pb='16' mt='6'>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.25, type: 'linear' }}
            >
              <Stack py={{ base: '6', md: '6' }} spacing='6'>
                <MotionGrid
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.5, type: 'linear' }}
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing='3'
                  color='white'
                >
                  {map(
                    proposals?.data,
                    ({
                      contract_address: contractAddress,
                      club: { slug },
                      submission: { title, description },
                    }) => (
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.25, type: 'linear' }}
                        whileHover={{
                          scale: 1.015,
                        }}
                        whileTap={{
                          scale: 1,
                        }}
                      >
                        <Link href={`/d/${slug}/proposals/${contractAddress}`}>
                          <Card
                            bg='base.900'
                            minH='auto'
                            position='relative'
                            px={{ base: '6', md: '6' }}
                            py={{ base: '6', md: '6' }}
                            justifyContent='center'
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            _hover={{
                              cursor: 'pointer',
                            }}
                          >
                            <Stack direction='row' minH='15vh' justify='center'>
                              <Stack
                                spacing='4'
                                direction={{
                                  base: 'row',
                                  md: 'column',
                                }}
                                justify='space-between'
                                color='white'
                              >
                                <HStack justify='space-between'>
                                  <HStack>
                                    <Badge
                                      bg='dark.700'
                                      color='primary.900'
                                      size='sm'
                                      py='1'
                                      px='3'
                                      borderRadius='lg'
                                    >
                                      Pending
                                    </Badge>
                                  </HStack>
                                  <HStack>
                                    {isHovered && (
                                      <motion.div
                                        variants={FADE_IN_VARIANTS}
                                        initial={FADE_IN_VARIANTS.hidden}
                                        animate={FADE_IN_VARIANTS.enter}
                                        exit={FADE_IN_VARIANTS.exit}
                                        transition={{
                                          duration: 0.5,
                                          type: 'linear',
                                        }}
                                      >
                                        <Icon
                                          as={ArrowRight}
                                          boxSize='5'
                                          color='light.900'
                                        />
                                      </motion.div>
                                    )}
                                  </HStack>
                                </HStack>
                                <Stack>
                                  <HStack spacing='3' justify='space-between'>
                                    <Stack direction='column' spacing='3'>
                                      <HStack align='center' spacing='2'>
                                        <Text
                                          fontWeight='black'
                                          fontSize='lg'
                                          lineHeight='1.15'
                                        >
                                          {title}
                                        </Text>
                                      </HStack>
                                      <Text
                                        fontWeight='regular'
                                        fontSize='sm'
                                        color='gray'
                                      >
                                        {description &&
                                          truncate(description, {
                                            length: 70,
                                          })}
                                      </Text>
                                    </Stack>
                                  </HStack>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Card>
                        </Link>
                      </motion.div>
                    ),
                  )}
                </MotionGrid>
              </Stack>
            </motion.div>
          </Stack>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Proposals.getLayout = (page: any) => (
  <AppLayout header={<VotingHeader />}>{page}</AppLayout>
);
