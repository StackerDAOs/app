import { Heading, Stack, Text } from 'ui';
import { motion, SLIDE_UP_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
// import { Step } from 'ui/components/feedback';
// import { useStep } from 'hooks';

// const steps = [
//   {
//     title: 'Step 1',
//     description: 'Description',
//   },
//   {
//     title: 'Step 2',
//     description: 'Description',
//   },
//   {
//     title: 'Step 3',
//     description: 'Description',
//   },
//   {
//     title: 'Step 4',
//     description: 'Description',
//   },
// ];

export default function Create() {
  // const [currentStep, { setStep }] = useStep({ maxSteps: steps.length });

  return (
    <motion.div
      variants={SLIDE_UP_VARIANTS}
      initial={SLIDE_UP_VARIANTS.hidden}
      animate={SLIDE_UP_VARIANTS.enter}
      exit={SLIDE_UP_VARIANTS.exit}
      transition={{ duration: 0.8, type: 'linear' }}
    >
      <Container display='flex' alignItems='center' h='100vh'>
        <Stack spacing='2'>
          <SectionHeader justify='flex-start' align='center' color='white'>
            <Stack spacing='1'>
              <Text fontSize='md' fontWeight='light' color='gray'>
                Browse communities
              </Text>
              <Heading size='lg' fontWeight='regular'>
                Explore DAOs
              </Heading>
            </Stack>
          </SectionHeader>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} spacing='4'>
          {/* {steps.map((step, id) => (
            <Step
              key={id}
              cursor='pointer'
              onClick={() => setStep(id)}
              title={step.title}
              description={step.description}
              isActive={currentStep === id}
              isCompleted={currentStep > id}
            />
          ))} */}
        </Stack>
      </Container>
    </motion.div>
  );
}
