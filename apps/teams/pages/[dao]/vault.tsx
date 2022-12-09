import React from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from 'ui';
import { SectionHeader } from 'ui/components/layout';
import { DashboardLayout } from '@components/layout';
import { Card } from 'ui/components/cards';
import { AssetTable } from '@components/tables';
import { useTeam } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { map } from 'lodash';

export default function Vault() {
  const dao = useTeam();
  const isActive = dao?.data?.active;
  const [tab, setTab] = React.useState('Tokens');

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
        <Stack spacing='1'>
          <SectionHeader
            justify={{ base: 'flex-start', md: 'space-between' }}
            align={{ base: 'flex-start', md: 'space-between' }}
            color='light.900'
          >
            <Stack spacing='3'>
              <Text fontSize='md' fontWeight='light' color='text-muted'>
                {tab}
              </Text>
              <Heading mt='0 !important' size='lg' fontWeight='medium'>
                Manage Assets
              </Heading>
            </Stack>
          </SectionHeader>
          <Tabs
            color='light.900'
            variant='unstyled'
            isFitted
            onChange={(tabIndex: number) =>
              setTab(['Tokens', 'Collectibles'][tabIndex])
            }
          >
            <TabList>
              <ButtonGroup bg='dark.900' borderRadius='lg' px='1'>
                {map(['Tokens', 'Collectibles'], (item) => (
                  <Tab
                    key={item}
                    fontSize='md'
                    borderRadius='lg'
                    color='light.500'
                    px='4'
                    w='50%'
                    _selected={{
                      color: 'light.900',
                      bg: 'dark.700',
                    }}
                  >
                    {item}
                  </Tab>
                ))}
              </ButtonGroup>
            </TabList>
            <TabPanels>
              <TabPanel px='0'>
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.25, type: 'linear' }}
                >
                  <AssetTable type='fungible' variant='simple' />
                </motion.div>
              </TabPanel>
              <TabPanel px='0'>
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.25, type: 'linear' }}
                >
                  <AssetTable type='nonFungible' />
                </motion.div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </motion.div>
  );
}

Vault.getLayout = (page: any) => (
  <DashboardLayout
    header={
      <Flex justify='space-between' align='center' py='5' px='4'>
        <Heading size='md' fontWeight='black' letterSpacing='tight'>
          Vault
        </Heading>
        <Button variant='default' size='sm' isDisabled>
          Deposit
        </Button>
      </Flex>
    }
  >
    {page}
  </DashboardLayout>
);
