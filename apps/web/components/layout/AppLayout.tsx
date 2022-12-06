import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Stack } from 'ui';
import { ConnectButton } from 'ui/components/buttons';
import { ChevronRight, LogoIcon } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const AppLayout = ({ children }: any) => (
  <Stack spacing='10'>
    <Flex
      justify='space-between'
      align='center'
      bg='dark.800'
      borderBottomWidth='1px'
      borderBottomColor='dark.500'
      py='1'
      px='16'
      mt='0 !important'
    >
      <Breadcrumb spacing='2' separator={<ChevronRight fontSize='sm' />}>
        <BreadcrumbItem
          color='gray'
          _hover={{
            color: 'light.900',
          }}
        >
          <BreadcrumbLink
            as={Link}
            href='/'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <LogoIcon
              my='2'
              alt='logo'
              url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/logo-with-name.png'
              cursor='pointer'
              width='150px'
            />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <ConnectButton
        variant='inverted'
        size='sm'
        _hover={{ opacity: 0.9 }}
        _active={{ opacity: 1 }}
      />
    </Flex>

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
);
