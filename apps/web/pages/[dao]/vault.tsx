import React from 'react';
import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
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
import { AssetTable } from '@components/tables';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { map } from 'lodash';

export default function Vault() {
  const [tab, setTab] = React.useState('Tokens');
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
      <Flex
        justify='space-between'
        align='center'
        borderBottomWidth='1px'
        borderBottomColor='dark.500'
        py='5'
        px='4'
      >
        <Heading size='md' fontWeight='black' letterSpacing='tight'>
          Vault
        </Heading>
        <Button variant='default' size='sm'>
          Deposit
        </Button>
      </Flex>
    }
  >
    {page}
  </DashboardLayout>
);
