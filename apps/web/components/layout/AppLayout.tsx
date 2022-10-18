import { Flex, Stack, useBreakpointValue } from 'ui';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Navbar, Sidebar } from '@components/navigation';
import { useDAO } from 'ui/hooks';
import { useAuth } from 'ui/components';

export const AppLayout = ({ header, children }: any) => {
  const dao = useDAO();
  const { isSignedIn } = useAuth();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const clubExists = dao?.data;
  const conditionalStyling =
    !clubExists || !isSignedIn ? { justify: 'center', m: '0 auto' } : {};
  return (
    <Flex
      as='section'
      direction={{ base: 'column', lg: 'row' }}
      height='100vh'
      bg='dark.900'
      overflowY='auto'
      backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #121416)'
      opacity='1'
    >
      {isDesktop ? <Sidebar /> : <Navbar />}

      <Stack
        spacing={{ base: '8', lg: '6' }}
        className='whre'
        {...conditionalStyling}
      >
        <Wrapper flex='1'>
          {header}
          <Stack spacing={{ base: '5', lg: '6' }}>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.75, type: 'linear' }}
            >
              {children}
            </motion.div>
          </Stack>
        </Wrapper>
      </Stack>
    </Flex>
  );
};
