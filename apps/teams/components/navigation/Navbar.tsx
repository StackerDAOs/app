import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { ToggleButton } from '@components/disclosure';
import { LogoIcon } from 'ui/components/icons';
import { Sidebar } from './Sidebar';

export const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Box
      width='full'
      py='4'
      px={{ base: '4', md: '8' }}
      bg='bg-surface'
      boxShadow='sm-dark'
    >
      <Flex justify='space-between'>
        <LogoIcon
          alt='logo'
          url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
          cursor='pointer'
          height='35px'
        />
        <ToggleButton
          isOpen={isOpen}
          aria-label='Open Menu'
          onClick={onToggle}
        />
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          // Only disabled for showcase
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
