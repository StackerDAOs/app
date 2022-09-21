import { Image, ImageProps } from '@chakra-ui/react';

interface ImagePropsType extends ImageProps {
  url: string;
}

export const LogoIcon = (props: ImagePropsType) => {
  return <Image src={props.url} {...props} />;
};
