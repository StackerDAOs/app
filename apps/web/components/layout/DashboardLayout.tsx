import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  useBreakpointValue,
} from 'ui';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Navbar, Sidebar } from '@components/navigation';
import { useDAO } from 'ui/hooks';
import { useAuth } from 'ui/components';

export const DashboardLayout = ({ children, header }: any) => {
  const dao = useDAO();
  const { isSignedIn } = useAuth();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Grid templateColumns='repeat(9, 1fr)'>
      <GridItem colSpan={2}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={7}>
        <motion.div
          variants={FADE_IN_VARIANTS}
          initial={FADE_IN_VARIANTS.hidden}
          animate={FADE_IN_VARIANTS.enter}
          exit={FADE_IN_VARIANTS.exit}
          transition={{ duration: 0.75, type: 'linear' }}
        >
          <Stack>
            {header}
            <Wrapper>{children}</Wrapper>
          </Stack>
        </motion.div>
      </GridItem>
    </Grid>
  );
};
