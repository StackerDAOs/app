import React from 'react';
import {
  Button,
  Center,
  CenterProps,
  FormControl,
  HStack,
  Icon,
  Input,
  Square,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';

export const FileUpload = (props: CenterProps) => {
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
    <Center
      borderWidth='1px'
      borderRadius='lg'
      px='6'
      py='4'
      bg='dark.800'
      {...props}
    >
      <FormControl>
        <VStack spacing='3'>
          <Square size='10' bg='bg-subtle' borderRadius='lg' onClick={getFile}>
            <Icon as={FiUploadCloud} boxSize='5' color='muted' />
          </Square>
          <VStack spacing='1'>
            <Input
              display='none'
              type='file'
              name='file'
              ref={fileInput}
              accept='.csv, .xls, .xlsx'
              onChange={getFile}
              placeholder='SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE'
              autoComplete='off'
              size='lg'
            />
            <Text fontSize='xs' color='muted'>
              CSV
            </Text>
          </VStack>
        </VStack>
      </FormControl>
    </Center>
  );
};
