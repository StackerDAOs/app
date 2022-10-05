// Hook (use-generate-name.tsx)
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export function useGenerateName() {
  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length: 3,
  };

  const randomName: string = uniqueNamesGenerator(customConfig);

  return { randomName };
}
