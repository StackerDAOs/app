import { Grid, GridItem, Stack } from 'ui';
import { Wrapper } from '@components/containers';
import { Sidebar } from '@components/navigation';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const ProposalLayout = ({ children, header }: any) => (
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
        <Stack spacing='3'>
          {header}
          <Wrapper>{children}</Wrapper>
        </Stack>
      </motion.div>
    </GridItem>
  </Grid>
);
