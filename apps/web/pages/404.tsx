import { Flex, Image, Text } from 'ui';

export default function NotFound() {
  return (
    <Flex
      bg='dark.900'
      direction='column'
      align='center'
      pt={{ sm: '125px', lg: '75px' }}
    >
      <Image
        src='https://sinhvien.bvu.edu.vn/Content/loginnews/images/loi-404.png'
        w='400px'
        maxW='90%'
        mt={{ base: '4vh', lg: '20vh' }}
        mb='10px'
      />
      <Text
        color='light.900'
        fontSize={{ base: '40px', lg: '46px' }}
        fontWeight='thin'
        mb='30px'
        textAlign={{ base: 'center', md: 'start' }}
      >
        Ah, dang. We didn&apos;t find that page.
      </Text>
    </Flex>
  );
}
