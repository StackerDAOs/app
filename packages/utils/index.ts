import { c32addressDecode } from 'c32check';
import { has } from 'lodash';
import {
  trueCV,
  falseCV,
  contractPrincipalCV,
  standardPrincipalCV,
  tupleCV,
  someCV,
  noneCV,
} from 'micro-stacks/clarity';
import {
  FungibleConditionCode,
  makeContractSTXPostCondition,
  makeContractFungiblePostCondition,
  createAssetInfo,
} from 'micro-stacks/transactions';

export const contractPrincipal = (address: string): string[] =>
  address.split('.');

export const getExplorerLink = (txId: string) =>
  process.env.VERCEL_ENV === 'production'
    ? `https://explorer.stacks.co/txid/${txId}?chain=mainnet`
    : process.env.VERCEL_ENV === 'development'
    ? `http://localhost:8000/txid/${txId}?chain=testnet`
    : `https://explorer.stacks.co/txid/${txId}?chain=testnet`;

export const truncate = (
  str: string,
  firstCharCount = str.length,
  endCharCount = 0,
  dotCount = 3,
) => {
  let convertedStr = '';
  convertedStr += str.substring(0, firstCharCount);
  convertedStr += '.'.repeat(dotCount);
  convertedStr += str.substring(str.length - endCharCount, str.length);
  return convertedStr;
};

export const convertToken = (token: string, decimals: number) => {
  const convertWithDecimals = 10 ** parseInt(decimals?.toString());
  return (parseInt(token) / convertWithDecimals).toLocaleString('en-US');
};

export const tokenToNumber = (amount: number, decimals: number) => {
  const convertWithDecimals = 10 ** decimals;
  return amount / convertWithDecimals;
};

export const ustxToStx = (uStx: string) =>
  (parseInt(uStx) / 1000000).toLocaleString('en-US');

export const microToStacks = (
  amountInMicroStacks: string | number,
  localString = true,
): number | string => {
  const value = Number(Number(amountInMicroStacks) / 10 ** 6);
  if (localString) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  }
  return value;
};

export const stxToUstx = (stx: string) => parseInt(stx) * 1000000;

export const tokenToDecimals = (amount: number, decimals: number) => {
  const convertWithDecimals = 10 ** parseInt(decimals?.toString());
  return amount * convertWithDecimals;
};

export const pluckSourceCode = (sourceCode: string, param: string) => {
  const sourceParam = param[0].toUpperCase() + param.substring(1);
  return sourceCode?.split(`;; ${sourceParam}: `)[1]?.split('\n')[0];
};

export const estimateDays = (blocksUntil: number) =>
  // TODO: use a better estimate
  Math.round((blocksUntil * 10) / 1440);

export const getPercentage = (totalSupply: number, totalVotes: number) => {
  if (isNaN((totalVotes / totalSupply) * 100)) {
    return 0;
  }
  return (totalVotes / totalSupply) * 100;
};

export const formatComments = (comments: string) => {
  const newString = comments.replace(/(?:\r\n|\r|\n)/g, ' ');
  return newString;
};

export const validateStacksAddress = (stacksAddress: string): boolean => {
  try {
    c32addressDecode(stacksAddress);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateContractName = (contractString: string): boolean => {
  if (!contractString.includes('.')) return false;

  const stxAddress = contractString.split('.')[0];
  const contractName = contractString.split('.')[1];
  const nameRegex = /[a-zA-Z]([a-zA-Z0-9]|[-_!?+<>=/*])*$|^[-+=/*]$|^[<>]=?$/;
  try {
    const validStacksAddress = validateStacksAddress(stxAddress);
    const validName = nameRegex.exec(contractName);
    return !!(validName && validStacksAddress);
  } catch (e) {
    return false;
  }
};

export const getDelegators = ({
  voteFor,
  proposalContractAddress,
  proposalContractName,
  delegatorAddresses,
}: any) => {
  return delegatorAddresses?.map((address: any) => {
    const delegatorVotes =
      proposalContractAddress &&
      proposalContractName &&
      tupleCV({
        for: voteFor ? trueCV() : falseCV(),
        proposal: contractPrincipalCV(
          proposalContractAddress,
          proposalContractName,
        ),
        delegator: someCV(standardPrincipalCV(address)),
      });
    return delegatorVotes;
  });
};

export const generateWithDelegators = ({
  voteFor,
  proposalContractAddress,
  proposalContractName,
  delegators,
}: any) => {
  if (proposalContractAddress && proposalContractName && delegators) {
    return [
      tupleCV({
        for: voteFor ? trueCV() : falseCV(),
        proposal: contractPrincipalCV(
          proposalContractAddress,
          proposalContractName,
        ),
        delegator: noneCV(),
      }),
      ...delegators,
    ] as any;
  }
};

// export const generatePostConditions = ({
//   postConditions,
//   isPassing,
//   assetName,
//   fungibleTokenDecimals,
// }: any) => {
//   if (postConditions) {
//     const { from, amount } = postConditions;
//     const isFungible = has(postConditions, 'assetAddress');
//     if (isFungible) {
//       // Token Post Condition
//       const { assetAddress } = postConditions;
//       const contractAddress = from?.split('.')[0];
//       const contractName = from?.split('.')[1];
//       const contractAssetAddress = assetAddress?.split('.')[0];
//       const contractAssetName = assetAddress?.split('.')[1];
//       const fungibleAssetInfo =
//         contractAssetAddress &&
//         contractAssetName &&
//         createAssetInfo(contractAssetAddress, contractAssetName, assetName);
//       const pc = isPassing
//         ? [
//             makeContractFungiblePostCondition(
//               contractAddress,
//               contractName,
//               FungibleConditionCode.Equal,
//               tokenToDecimals(Number(amount), fungibleTokenDecimals),
//               fungibleAssetInfo,
//             ),
//           ]
//         : [];
//       return pc;
//     } else {
//       // STX Post Condition
//       const contractAddress = from?.split('.')[0];
//       const contractName = from?.split('.')[1];
//       const postConditionCode = FungibleConditionCode.Equal;
//       const postConditionAmount = stxToUstx(amount);
//       const postConditions = isPassing
//         ? [
//             makeContractSTXPostCondition(
//               contractAddress,
//               contractName,
//               postConditionCode,
//               postConditionAmount,
//             ),
//           ]
//         : [];
//       return postConditions;
//     }
//   }
// };

export function findExtension(extensions: Array<any[]>, type: string): any {
  return extensions?.find(
    (extension: any) => extension.extension_types.name === type,
  );
}

export function nameToSlug(name: string) {
  return name.toLowerCase().replace(/ /g, '-');
}
