import React from 'react';
import { FormControl, Heading, HStack, Stack, Tag, Text } from 'ui';

import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { useProposalStore } from 'store';

const templates = [
  {
    id: '1',
    label: 'Asset Management',
    color: 'orange.500',
    name: 'Vault and assets',
    description: 'Transfer assets, add new tokens to allowlist, etc.',
  },
  {
    id: '2',
    label: 'Governance',
    color: 'blue.500',
    name: 'Rule Changes',
    description: 'Change membership, governance parameters, etc.',
  },
];

export const TemplateSelect = () => {
  const proposal = useProposalStore((state) => state.proposal);
  const handleSelectTemplate = useProposalStore(
    (state) => state.handleSelectTemplate,
  );

  return (
    <Stack spacing='6' justify='center' px='8' m='0 auto' maxW='3xl'>
      <Stack spacing='0' align='flex-start'>
        <Text fontSize='lg' fontWeight='medium'>
          Select a template
        </Text>
        <Text color='light.500' fontSize='sm' maxW='lg'>
          Start building out your proposal by choosing from the options below.
        </Text>
      </Stack>
      <Stack spacing='3'>
        <FormControl>
          <RadioCardGroup
            defaultValue='1'
            onChange={(value) => {
              handleSelectTemplate(value);
            }}
            value={proposal.selectedTemplate}
            spacing='3'
          >
            {templates?.map((option) => (
              <RadioCard
                key={option.id}
                value={option.id}
                p='5'
                borderRadius='lg'
                _hover={{
                  bg: 'dark.800',
                  borderColor: 'secondary.900',
                }}
              >
                <Stack
                  spacing='2'
                  _hover={{
                    cursor: 'pointer',
                    borderRadius: 'lg',
                    bg: 'dark.800',
                  }}
                >
                  <HStack spacing='3' justify='space-between'>
                    <Stack spacing='2'>
                      <Tag
                        color={option.color}
                        bg='dark.800'
                        alignSelf='self-start'
                        size='sm'
                        borderRadius='3xl'
                      >
                        <Text as='span' fontWeight='regular'>
                          {option.label}
                        </Text>
                      </Tag>
                      <HStack align='flex-start' spacing='4'>
                        <Stack spacing='1' maxW='lg'>
                          <Heading size='sm' fontWeight='black'>
                            {option.name}
                          </Heading>
                          <Text fontSize='sm' fontWeight='light' color='gray'>
                            {option.description}
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                  </HStack>
                </Stack>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
};
