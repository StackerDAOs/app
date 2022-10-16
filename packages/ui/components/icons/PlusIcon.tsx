import { Icon } from '@chakra-ui/react';

export const PlusIcon = (props: any) => (
  <Icon
    xmlns='http://www.w3.org/2000/svg'
    viewBow='0 0 20 20'
    fill='currentColor'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </Icon>
);
