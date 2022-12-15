import { Icon } from '@chakra-ui/react';

export const UndoIcon = (props: any) => (
  <Icon
    xmlns='http://www.w3.org/2000/svg'
    viewBow='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='1.5'
    {...props}
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
    />
  </Icon>
);
