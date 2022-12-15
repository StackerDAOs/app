import React from 'react';
import Link from 'next/link';
import { Badge, HStack, Stack, Text } from 'ui';
import { Card } from 'ui/components/cards';
import { useTeam, useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const ProposalCard = ({ contractAddress, submission }: any) => {
  const dao = useTeam();
  const { title, description, tx_id: transactionId } = submission;
  const transaction = useTransaction(transactionId);
  console.log({ transaction });

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Link href={`/${dao?.data?.slug}/proposals/${contractAddress}`}>
        <Card
          bg='dark.700'
          display='flex'
          alignItems='flex-start'
          minH='200px'
          position='relative'
          px={{ base: '6', md: '6' }}
          py={{ base: '6', md: '6' }}
          _hover={{
            cursor: 'pointer',
          }}
        >
          <Stack direction='row' justify='center'>
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
                    bg='dark.500'
                    color='primary.900'
                    size='sm'
                    py='1'
                    px='5'
                    borderRadius='3xl'
                  >
                    Pending
                  </Badge>
                </HStack>
              </HStack>
              <Stack>
                <HStack spacing='3' justify='space-between'>
                  <Stack direction='column' spacing='3'>
                    <HStack align='center' spacing='2'>
                      <Text fontWeight='black' fontSize='lg' lineHeight='1.15'>
                        {title}
                      </Text>
                    </HStack>
                    <Text
                      fontWeight='regular'
                      fontSize='sm'
                      color='gray'
                      overflow='hidden'
                      textOverflow='ellipsis'
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {description}
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Link>
    </motion.div>
  );
};
