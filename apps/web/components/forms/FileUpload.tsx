import React from 'react';
import {
  Button,
  Box,
  Center,
  CenterProps,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Square,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';
import { LightBulbIcon } from 'ui/components/icons';

export const FileUpload = ({
  name,
  placeholder,
  acceptedFileTypes,
  children,
}: any) => {
  const fileInput = React.useRef<null | any>(null);
  const getFile = (event: any) => {
    // Get the selected file from the input
    const file = fileInput?.current?.files[0];

    // Create a new FileReader instance
    const reader = new FileReader();

    // Handle the load event for the FileReader
    reader.onload = (event) => {
      // The file's contents are available in event.target.result
      const fileContents = event?.target?.result;
      console.log({ fileContents });

      // You can use the fileContents as needed in your React component
    };

    // Read the file as a string
    reader.readAsText(file);
  };
  return (
    <FormControl>
      <FormLabel htmlFor='writeUpFile'>{children}</FormLabel>
      <InputGroup>
        <input
          type='file'
          accept={acceptedFileTypes}
          name={name}
          ref={fileInput}
          style={{ display: 'none', caretColor: 'transparent' }}
        />
        <Stack
          spacing='6'
          align='center'
          justify='center'
          onClick={() => fileInput.current.click()}
          borderColor='dark.500'
          borderWidth='1px'
          borderStyle='dashed'
        >
          <Input cursor='default' border='none' color='transparent' />
          <VStack spacing='3'>
            <Square size='10' bg='bg-subtle' borderRadius='lg'>
              <Icon as={FiUploadCloud} boxSize='5' color='muted' />
            </Square>
            <VStack spacing='1'>
              <HStack spacing='1' whiteSpace='nowrap'>
                <Button variant='link' colorScheme='blue' size='sm'>
                  Click to upload
                </Button>
                <Text fontSize='sm' color='muted'>
                  or drag and drop
                </Text>
              </HStack>
              <Text fontSize='xs' color='muted'>
                PNG, JPG or GIF up to 2MB
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </InputGroup>
    </FormControl>
  );
};
