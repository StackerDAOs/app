import { traitPrincipal } from 'api/constants';
import { BootstrapExtensions, BootstrapTeamExtensions } from 'sdk/common';

const generateClarityList = (
  members: string[],
  nftMembershipContract: string,
) => {
  let memberList = '';
  members.forEach((address, index) => {
    memberList += `(try! (contract-call? '${nftMembershipContract} mint '${address}))`;
    if (index !== members?.length - 1) {
      memberList += `  \n    `;
    }
  });
  return memberList;
};

const generateClarityListOfAssets = (
  allowlist: string[],
  vaultContract: string,
) => {
  let allowList = '';
  allowlist.forEach((address, index) => {
    allowList += `(try! (contract-call? '${vaultContract} set-allowed '${address} true))`;
    if (index !== allowlist?.length - 1) {
      allowList += `  \n    `;
    }
  });
  return allowList;
};

export const bootstrapProposal = (
  coreDao: string,
  extensions: BootstrapExtensions,
  members?: string[],
  allowlist?: string[],
) => {
  const {
    vaultContract,
    governanceTokenContract,
    nftMembershipContract,
    investmentClubContract,
    submissionContract,
    votingContract,
  } = extensions;

  const memberList = members
    ? generateClarityList(members, nftMembershipContract)
    : '';
  const allowList = allowlist
    ? generateClarityListOfAssets(allowlist, vaultContract)
    : '';

  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    (try! (contract-call? '${coreDao} set-extensions
      (list
        { extension: '${vaultContract}, enabled: true }
        { extension: '${governanceTokenContract}, enabled: true }
        { extension: '${nftMembershipContract}, enabled: true }
        { extension: '${investmentClubContract}, enabled: true }
        { extension: '${submissionContract}, enabled: true }
        { extension: '${votingContract}, enabled: true }
      )
    ))

    ${memberList}
    
    ${allowList}

    (try! (contract-call? '${investmentClubContract} start))

    (print { message: "...to be a completely separate network and separate block chain, yet share CPU power with Bitcoin.", sender: sender })
    (ok true)
  )
)
`;
};

const generateTeamMembers = (members: string[], multisigContract: string) => {
  let memberList = '';
  members.forEach((address, index) => {
    memberList += `(try! (contract-call? '${multisigContract} set-approver '${address} true))`;
    if (index !== members?.length - 1) {
      memberList += `  \n    `;
    }
  });
  return memberList;
};

export const bootstrapTeamProposal = (
  coreDao: string,
  extensions: BootstrapTeamExtensions,
  signalsRequired?: number,
  members?: string[],
  allowlist?: string[],
) => {
  const { vaultContract, multisigContract } = extensions;

  const teamMemberList = members
    ? generateTeamMembers(members, multisigContract)
    : '';
  const allowList = allowlist
    ? generateClarityListOfAssets(allowlist, vaultContract)
    : '';

  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    (try! (contract-call? '${coreDao} set-extensions
      (list
        { extension: '${vaultContract}, enabled: true }
        { extension: '${multisigContract}, enabled: true }
      )
    ))

    ${teamMemberList}

    (try! (contract-call? '${multisigContract} set-signals-required u${signalsRequired}))
    
    ${allowList}

    (print { message: "...to be a completely separate network and separate block chain, yet share CPU power with Bitcoin.", sender: sender })
    (ok true)
  )
)
`;
};
