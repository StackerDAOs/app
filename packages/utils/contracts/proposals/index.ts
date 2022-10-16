import { traitPrincipal } from 'api/constants';

const generateClarityList = (
  recipients: string[],
  vaultContract: string,
  amount: string,
) => {
  let recipientList = '';
  recipients.forEach((recipientAddress, index) => {
    recipientList += `(try! (contract-call? '${vaultContract} stx-transfer u${amount} '${recipientAddress} none))`;
    if (index !== recipients?.length - 1) {
      recipientList += `  \n    `;
    }
  });
  return recipientList;
};

export const sendFunds = (
  recipients: string[],
  vaultContract: string,
  amount: string,
) => {
  return `
(impl-trait '${traitPrincipal}.proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ${generateClarityList(recipients, vaultContract, amount)}
    (print {event: "execute", sender: sender})
    (ok true)
  )
)
`;
};
