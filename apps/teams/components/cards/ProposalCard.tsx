import React from 'react';
import Link from 'next/link';
import { Badge, HStack, Stack, Text } from 'ui';
import { Card } from 'ui/components/cards';
import { useTeam, useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const ProposalCard = (props: any) => {
  const {
    contract_address: contractAddress,
    tx_id: transactionId,
    submission,
  } = props;
  const dao = useTeam();
  const { title, description } = submission;
  const transaction = useTransaction(transactionId);

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
          bg='dark.900'
          display='flex'
          alignItems='flex-start'
          h='fit-content'
          position='relative'
          px={{ base: '6', md: '6' }}
          py={{ base: '6', md: '6' }}
          pointerEvents={
            transaction?.data?.tx_status === 'pending' ? 'none' : 'auto'
          }
          _hover={{
            cursor: 'pointer',
            bg: 'dark.800',
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
                  {transaction?.data?.tx_status === 'pending' && (
                    <Badge
                      bg='dark.800'
                      color='yellow.500'
                      size='sm'
                      py='1'
                      px='5'
                      borderWidth='1px'
                      borderRadius='3xl'
                      borderColor='dark.500'
                    >
                      Pending
                    </Badge>
                  )}
                  {transaction?.data?.tx_status === 'success' && (
                    <Badge
                      bg='dark.800'
                      color='secondary.900'
                      size='sm'
                      py='1'
                      px='5'
                      borderWidth='1px'
                      borderRadius='3xl'
                      borderColor='dark.500'
                    >
                      Active
                    </Badge>
                  )}
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
