import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Divider, Flex, Stack, Text } from 'ui';
import type { TextProps, ButtonProps } from '@chakra-ui/react';
import { useTeam } from 'ui/hooks';
import { AccountSwitcher } from '@components/feedback';

const NavHeading = (props: TextProps) => (
  <Text
    as='h4'
    fontSize='xs'
    fontWeight='semibold'
    px='4'
    lineHeight='1.25'
    color='gray'
    {...props}
  />
);

interface NavButtonProps extends ButtonProps {
  label: string;
  isSelected: boolean;
}

export const NavButton = (props: NavButtonProps) => {
  const { label, isSelected, ...buttonProps } = props;

  return (
    <Button
      px='6'
      variant='ghost'
      justifyContent='start'
      borderTopLeftRadius='sm'
      borderBottomLeftRadius='sm'
      borderTopRightRadius='none'
      borderBottomRightRadius='none'
      fontWeight='light'
      bg={isSelected ? 'dark.800' : 'transparent'}
      _hover={{ bg: 'dark.800', color: 'light.900' }}
      _selected={{
        fontWeight: 'regular',
      }}
      _active={{
        color: 'light.900',
        bg: 'dark.800',
        borderColor: 'transparent',
      }}
      _focus={{
        color: 'light.900',
        bg: 'dark.800',
        boxShadow: 'inset -4px 0px 0px #624AF2',
      }}
      boxShadow={isSelected ? 'inset -4px 0px 0px #624AF2' : 'none'}
      {...buttonProps}
    >
      {isSelected ? (
        <Text fontWeight='medium'>{label}</Text>
      ) : (
        <Text color='light.500' fontWeight='regular'>
          {label}
        </Text>
      )}
    </Button>
  );
};

export const Sidebar = () => {
  const router = useRouter();
  const dao = useTeam();
  const { dao: slug } = router.query as any;
  const isSelected = (path: string) => router.pathname.split('/')[2] === path;

  return (
    <Flex
      as='section'
      minH='100vh'
      bg='dark.900'
      position='sticky'
      top='0'
      zIndex='2'
      borderRightWidth='1px'
      borderRightColor='dark.500'
    >
      <Flex flex='1' overflowY='auto'>
        <Stack justify='space-between' spacing='1' w='100%'>
          <Stack>
            <AccountSwitcher dao={dao?.data?.name} />
            <Divider borderColor='dark.500' mt='0 !important' />
            <Stack spacing='1' py='1'>
              <Link href={`/${slug}`}>
                <NavButton
                  label='Dashboard'
                  isSelected={router.pathname.split('/')[2] === undefined}
                />
              </Link>
              {[
                { label: 'Vault', route: '/vault' },
                {
                  label: 'Proposals',
                  route: '/proposals',
                },
              ].map(({ label, route }) => (
                <Link key={label} href={`/${slug}${route}`}>
                  <NavButton
                    label={label}
                    isSelected={isSelected(label?.toLocaleLowerCase())}
                  />
                </Link>
              ))}
            </Stack>
            <Stack spacing={{ base: '5', sm: '6' }}>
              <Stack spacing='3'>
                <NavHeading>Configuration</NavHeading>
                <Stack spacing='1'>
                  <Link href={`/${slug}/extensions`}>
                    <NavButton
                      label='Extensions'
                      isSelected={isSelected('Extensions')}
                    />
                  </Link>
                  <NavButton
                    label='Settings'
                    isSelected={isSelected('Settings')}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
