import React from 'react';
import type { ButtonProps } from 'ui';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Icon,
  Grid,
  GridItem,
  Stack,
  Square,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { useAccount, useForm } from 'ui/components';
import { LightBulbIcon } from 'ui/components/icons';
import { useDAO } from 'ui/hooks';
import { useCreateIdea } from 'api/clubs/mutations';

interface IdeaDrawerProps extends ButtonProps {
  title: string;
}

export const IdeaDrawer = (props: IdeaDrawerProps) => {
  const { title } = props;
  const focusField = React.useRef<HTMLInputElement>(null);
  const { stxAddress } = useAccount();
  const dao = useDAO();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
    },
  });
  const createIdea = useCreateIdea();
  const handleCreateIdea = React.useCallback(async () => {
    try {
      createIdea.mutate({
        title: getValues('title'),
        description: getValues('description'),
        body: getValues('body'),
        submitted_by: stxAddress as string,
        club_id: dao?.data?.id,
      });
      if (createIdea.isSuccess) {
        setValue('title', '');
        setValue('description', '');
        setValue('body', '');
      }
    } catch (e: any) {
      console.error({ e });
    }
  }, []);

  const IdeaForm = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('selected', { data });
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={LightBulbIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            Submit your idea
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            You must be a club member to submit an idea and vote on others.
            There is no limit to the number of ideas you can submit and vote on.
          </Text>
        </Stack>
        <Stack spacing='3'>
          <FormControl>
            <Stack spacing='4'>
              <Grid templateColumns='repeat(5, 1fr)' gap='4'>
                <GridItem colSpan={5}>
                  <FormControl>
                    <FormLabel htmlFor='name' fontWeight='light' color='gray'>
                      Title
                    </FormLabel>
                    <Input
                      id='title'
                      autoComplete='off'
                      placeholder='Give your idea a name'
                      size='lg'
                      {...register('title', {
                        required: 'This is required',
                        minLength: {
                          value: 4,
                          message: 'Minimum length should be 4',
                        },
                      })}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={5}>
                  <FormControl>
                    <FormLabel htmlFor='name' fontWeight='light' color='gray'>
                      TL;DR
                    </FormLabel>
                    <Input
                      id='description'
                      autoComplete='off'
                      placeholder='In three sentences or less, explain your idea'
                      size='lg'
                      {...register('description', {
                        required: 'This is required',
                        minLength: {
                          value: 4,
                          message: 'Minimum length should be 4',
                        },
                      })}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={5}>
                  <FormControl>
                    <FormLabel htmlFor='body' fontWeight='light' color='gray'>
                      Description
                    </FormLabel>
                    <Textarea
                      id='body'
                      autoComplete='off'
                      placeholder='Describe your idea in detail'
                      size='lg'
                      {...register('body', {
                        required: 'This is required',
                        minLength: {
                          value: 3,
                          message: 'Minimum length should be 3',
                        },
                      })}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </Stack>
          </FormControl>
        </Stack>
        <Stack justify='flex-end' direction='row'>
          <Button
            size='lg'
            variant='primary'
            type='submit'
            isLoading={createIdea.isLoading}
            onClick={handleCreateIdea}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );

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
        <DrawerOverlay />
        <DrawerContent bg='dark.900'>
          <DrawerBody>{IdeaForm}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
