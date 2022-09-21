import React from 'react';
import {
  ButtonGroup,
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
import { AppLayout } from '@components/layout';
import { ExtensionsHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { map } from 'lodash';

export default function Extensions() {
  const [tab, setTab] = React.useState('Tokens');
  console.log({ tab });
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
                Explore Contracts
              </Text>
              <Heading mt='0 !important' size='lg' fontWeight='medium'>
                Browse Extensions
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
              <ButtonGroup bg='dark.800' borderRadius='lg' px='1'>
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
                      bg: 'dark.500',
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
                  {/* <AssetTable color='light.900' size='md' type='fungible' /> */}
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
                  {/* <AssetTable color='light.900' size='md' type='nonFungible' /> */}
                </motion.div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Extensions.getLayout = (page: any) => (
  <AppLayout header={<ExtensionsHeader />}>{page}</AppLayout>
);