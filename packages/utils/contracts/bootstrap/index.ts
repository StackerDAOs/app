import { traitPrincipal } from 'api/constants';

type BootstrapExtensions = {
  vaultContract: string;
  governanceTokenContract: string;
  nftMembershipContract: string;
  investmentClubContract: string;
  submissionContract: string;
  votingContract: string;
};

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

export const bootstrapProposal = (
  coreDao: string,
  extensions: BootstrapExtensions,
  members: string[],
) => {
  const {
    vaultContract,
    governanceTokenContract,
    nftMembershipContract,
    investmentClubContract,
    submissionContract,
    votingContract,
  } = extensions;

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

    ${generateClarityList(members, nftMembershipContract)}

    (try! (contract-call? '${investmentClubContract} start))

    (print { message: "...to be a completely separate network and separate block chain, yet share CPU power with Bitcoin.", sender: sender })
    (ok true)
  )
)
`;
};
