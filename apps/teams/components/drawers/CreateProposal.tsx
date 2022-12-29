import React from 'react';
import type { ButtonProps } from 'ui';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Circle,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Icon,
  Stack,
  useDisclosure,
} from 'ui';
import { useProposalStore } from 'store';
import {
  ProtocolUpgrade,
  TemplateSelect,
  VaultAndAssetManagement,
} from '@components/forms';
import { XIcon } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

interface ProposalDrawerProps extends ButtonProps {
  title: string;
}

export const CreateProposal = (props: ProposalDrawerProps) => {
  const proposal = useProposalStore((state) => state.proposal);
  const { title } = props;
  const focusField = React.useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...props} onClick={onOpen}>
        {title}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='xl'
        onClose={onClose}
        initialFocusRef={focusField}
      >
        <DrawerContent bg='dark.900' borderWidth='1px' borderColor='dark.500'>
          <Flex
            justify='space-between'
            align='center'
            bg='dark.800'
            borderBottomWidth='1px'
            borderBottomColor='dark.500'
            py='4'
            px={{ base: '8', md: '8' }}
          >
            <Circle
              size='8'
              bg='dark.800'
              borderWidth='1px'
              borderColor='dark.500'
              cursor='pointer'
              onClick={onClose}
            >
              <Icon as={XIcon} boxSize='4' />
            </Circle>

            <Breadcrumb spacing='2'>
              <BreadcrumbItem isCurrentPage color='gray'>
                <BreadcrumbLink
                  href='#'
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  Create Proposal Contract
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          <DrawerBody p='0'>
            <Stack
              px={{ base: '6', md: '6' }}
              py={{ base: '6', md: '6' }}
              spacing='2'
              m='0 auto'
            >
              <Box>
                {!proposal.selectedTemplate && <TemplateSelect />}
                {proposal.selectedTemplate === '1' && (
                  <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.75, type: 'linear' }}
                  >
                    <VaultAndAssetManagement onClose={onClose} />
                  </motion.div>
                )}
                {proposal.selectedTemplate === '2' && (
                  <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.75, type: 'linear' }}
                  >
                    <ProtocolUpgrade onClose={onClose} />
                  </motion.div>
                )}
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
