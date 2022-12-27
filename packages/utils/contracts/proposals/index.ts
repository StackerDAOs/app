import { traitPrincipal } from 'api/constants';
import { size } from 'lodash';
import { stxToUstx } from 'utils';

type Recipient = {
  to: string;
  amount: string;
};

const generateClarityList = (
  vaultContract: string,
  recipients: Recipient[],
) => {
  let recipientList = '';
  recipients.forEach((recipient, index) => {
    const amountInUstx = stxToUstx(recipient.amount);
    recipientList += `(try! (contract-call? '${vaultContract} withdraw-stx u${amountInUstx} '${recipient.to}))`;
    if (index !== recipients?.length - 1) {
      recipientList += `  \n    `;
    }
  });
  return recipientList;
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

export const transferStxProposal = (
  vaultContract: string,
  recipient: string,
  amount: number,
) => {
  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    (try! (contract-call? '${vaultContract} withdraw-stx u${amount} '${recipient}))
    (print {event: "execute", sender: sender})
    (ok true)
  )
)
`;
};

const protocolUpgrades = (params: any) => {
  const {
    enabledExtensions,
    disabledExtensions,
    clubExtension,
    submissionExtension,
    votingExtension,
    coreAddress,
  } = params;
  let upgrades = '';
  if (size(enabledExtensions) > 0) {
    let enabledExtensionList = '';
    enabledExtensions.forEach((enabledExtension: any, index: number) => {
      upgrades += `(try! (contract-call? '${coreAddress} set-extension '${enabledExtension} true))`;
      upgrades += `  \n    `;
    });
    upgrades += enabledExtensionList;
  }
  if (size(disabledExtensions) > 0) {
    let disabledExtensionList = '';
    disabledExtensions.forEach((disabledExtension: any, index: number) => {
      upgrades += `(try! (contract-call? '${coreAddress} set-extension '${disabledExtension} false))`;
      upgrades += `  \n    `;
    });
    upgrades += disabledExtensionList;
  }
  if (clubExtension?.fundraisingDurationInBlocks) {
    upgrades += `(try! (contract-call? '${clubExtension?.contractAddress} set-parameter "startWindow" u${clubExtension?.fundraisingDurationInBlocks}))`;
    upgrades += `  \n    `;
  }
  if (clubExtension?.minimumDepositAmount) {
    upgrades += `(try! (contract-call? '${clubExtension?.contractAddress} set-parameter "minimumDepositAmount" u${clubExtension?.minimumDepositAmount}))`;
    upgrades += `  \n    `;
  }
  if (submissionExtension?.proposalDurationInBlocks) {
    upgrades += `(try! (contract-call? '${submissionExtension?.contractAddress} set-parameter "proposalDuration" u${submissionExtension?.proposalDurationInBlocks}))`;
    upgrades += `  \n    `;
  }
  if (submissionExtension?.minimumProposalStartDelay) {
    upgrades += `(try! (contract-call? '${submissionExtension?.contractAddress} set-parameter "minimumProposalStartDelay" u${submissionExtension?.minimumProposalStartDelay}))`;
    upgrades += `  \n    `;
  }
  if (submissionExtension?.maximumProposalStartDelay) {
    upgrades += `(try! (contract-call? '${submissionExtension?.contractAddress} set-parameter "maximumProposalStartDelay" u${submissionExtension?.maximumProposalStartDelay}))`;
    upgrades += `  \n    `;
  }
  if (votingExtension?.executionDelay) {
    upgrades += `(try! (contract-call? '${votingExtension?.contractAddress} set-parameter "executionDelay" u${votingExtension?.executionDelay}))`;
    upgrades += `  \n    `;
  }
  return upgrades;
};

export const upgradeProtocolProposal = (params: any) => {
  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ${protocolUpgrades(params)}
    (print {event: "execute", sender: sender})
    (ok true)
  )
)
`;
};

const teamUpgrades = (params: any) => {
  const { addedMembers, removedMembers, signatureThreshold, multisigAddress } =
    params;
  let upgrades = '';
  if (size(addedMembers) > 0) {
    let addedMemberList = '';
    addedMembers.forEach((newMember: any, index: number) => {
      upgrades += `(try! (contract-call? '${multisigAddress} set-approver '${newMember} true))`;
      upgrades += `  \n    `;
    });
    upgrades += addedMemberList;
  }
  if (size(removedMembers) > 0) {
    let removedMemberList = '';
    removedMembers.forEach((memberToRemove: any, index: number) => {
      upgrades += `(try! (contract-call? '${multisigAddress} set-approver '${memberToRemove} false))`;
      upgrades += `  \n    `;
    });
    upgrades += removedMemberList;
  }
  if (signatureThreshold) {
    upgrades += `(try! (contract-call? '${multisigAddress} set-signals-required u${signatureThreshold}))`;
    upgrades += `  \n    `;
  }
  return upgrades;
};

export const upgradeTeamProposal = (params: any) => {
  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ${teamUpgrades(params)}
    (print {event: "execute", sender: sender})
    (ok true)
  )
)
`;
};

const allowedAssets = (params: any) => {
  const { vaultAddress, allowed, disabled } = params;
  let assets = '';
  if (size(allowed) > 0) {
    let allowList = '';
    allowed.forEach((asset: any, index: number) => {
      assets += `(try! (contract-call? '${vaultAddress} set-allowed '${asset} true))`;
      assets += `  \n    `;
    });
    assets += allowList;
  }
  if (size(disabled) > 0) {
    let disabledExtensionList = '';
    disabled.forEach((asset: any, index: number) => {
      assets += `(try! (contract-call? '${vaultAddress} set-allowed '${asset} false))`;
      assets += `  \n    `;
    });
    assets += disabledExtensionList;
  }
  return assets;
};

export const upgradeAllowedAssetsProposal = (params: any) => {
  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ${allowedAssets(params)}
    (print {event: "execute", sender: sender})
    (ok true)
  )
)
`;
};

export const vaultTemplateProposal = (
  vaultContract: string,
  recipients?: Recipient[],
  allowlist?: string[],
) => {
  const memberList = recipients
    ? generateClarityList(vaultContract, recipients)
    : '';
  const allowList = allowlist
    ? generateClarityListOfAssets(allowlist, vaultContract)
    : '';

  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ${allowList}
    ${memberList}
    (print {event: "execute", sender: sender})
    (ok true)
  )
)
`;
};
