import { traitPrincipal } from 'api/constants';

export const nftMembership = (name: string) => `
(impl-trait '${traitPrincipal}.club-membership-nft-trait.club-membership-nft-trait)

(define-constant ERR_UNAUTHORIZED (err u2400))
(define-constant ERR_NOT_TOKEN_OWNER (err u2401))
(define-constant ERR_MEMBERSHIP_LIMIT_REACHED (err u2402))
(define-constant ERR_ALREADY_MEMBER (err u2403))

(define-constant MEMBERSHIP_LIMIT u99)

(define-non-fungible-token ${name} uint)

(define-data-var lastId uint u0)
(define-data-var totalSupply uint u0)
(define-data-var tokenUri (optional (string-utf8 256)) none)

(define-map Members principal bool)

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (mint (recipient principal))
  (begin
    (try! (is-dao-or-extension))
      (let
        (
          (nextId (+ (var-get lastId) u1))
          (newTotalSupply (+ (var-get totalSupply) u1))
        )
      (asserts! (<= newTotalSupply MEMBERSHIP_LIMIT) ERR_MEMBERSHIP_LIMIT_REACHED)
      (asserts! (map-insert Members recipient true) ERR_ALREADY_MEMBER)
      (var-set lastId nextId)
      (var-set totalSupply newTotalSupply)
      (nft-mint? ${name} nextId recipient)
    )
  )
)

(define-public (burn (id uint) (owner principal))
  (begin
    (try! (is-dao-or-extension))
    (var-set totalSupply (- (var-get totalSupply) u1))
    (map-delete Members owner)
    (nft-burn? ${name} id owner)
  )
)

(define-private (mint-many-iter (data { recipient: principal }))
  (mint (get recipient data))
)

(define-public (mint-many (recipients (list 200 { recipient: principal })))
  (begin
    (try! (is-dao-or-extension))
    (ok (map mint-many-iter recipients))
  )
)

(define-read-only (get-total-supply)
  (ok (var-get totalSupply))
)

(define-read-only (get-token-uri)
  (ok (var-get tokenUri))
)

(define-read-only (get-owner (tokenId uint))
  (nft-get-owner? ${name} tokenId)
)

(define-read-only (is-member (who principal))
  (default-to false (map-get? Members who))
)
`;

export const governanceToken = (name: string, symbol: string) => `
(impl-trait '${traitPrincipal}.club-governance-token-trait.club-governance-token-trait)

(define-constant ERR_UNAUTHORIZED (err u2400))
(define-constant ERR_NOT_TOKEN_OWNER (err u2401))
(define-constant ERR_MEMBERSHIP_LIMIT_REACHED (err u2402))

(define-fungible-token ${name})

(define-data-var tokenName (string-ascii 32) "${name}")
(define-data-var tokenSymbol (string-ascii 10) "${symbol}")
(define-data-var tokenUri (optional (string-utf8 256)) none)
(define-data-var tokenDecimals uint u6)

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (mint (amount uint) (recipient principal))
  (begin
    (try! (is-dao-or-extension))
    (ft-mint? ${name} amount recipient)
  )
)

(define-public (burn (amount uint) (owner principal))
  (begin
    (try! (is-dao-or-extension))
    (ft-burn? ${name} amount owner)
  )
)

(define-private (mint-many-iter (item { amount: uint, recipient: principal }))
  (ft-mint? ${name} (get amount item) (get recipient item))
)

(define-public (mint-many (recipients (list 200 { amount: uint, recipient: principal })))
  (begin
    (try! (is-dao-or-extension))
    (ok (map mint-many-iter recipients))
  )
)

(define-read-only (get-name)
  (ok (var-get tokenName))
)

(define-read-only (get-symbol)
  (ok (var-get tokenSymbol))
)

(define-read-only (get-decimals)
  (ok (var-get tokenDecimals))
)

(define-read-only (get-balance (who principal))
  (ok (ft-get-balance ${name} who))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply ${name}))
)

(define-read-only (get-token-uri)
  (ok (var-get tokenUri))
)
`;

export const vault = () => `
(impl-trait '${traitPrincipal}.extension-trait.extension-trait)

(use-trait sip9 '${traitPrincipal}.sip9-trait.sip9-trait)
(use-trait sip10 '${traitPrincipal}.sip10-trait.sip10-trait)

(define-constant ERR_UNAUTHORIZED (err u3200))
(define-constant ERR_ASSET_NOT_WHITELISTED (err u3201))

(define-constant TREASURY_ADDRESS (as-contract tx-sender))

(define-map WhitelistedAssets principal bool)

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-whitelist (token principal) (enabled bool))
  (begin
    (try! (is-dao-or-extension))
    (print { event: "whitelist", token: token, enabled: enabled, caller: tx-sender })
    (ok (map-set WhitelistedAssets token enabled))
  )
)

(define-public (set-whitelists (whitelist (list 100 { token: principal, enabled: bool })))
  (begin
    (try! (is-dao-or-extension))
    (ok (map set-whitelist-iter whitelist))
  )
)

(define-public (stx-deposit (amount uint))
  (begin
    (try! (stx-transfer? amount tx-sender TREASURY_ADDRESS))
    (print { event: "stx-deposit", amount: amount, caller: tx-sender })
    (ok true)
  )
)

(define-public (sip9-deposit (asset <sip9>) (id uint))
  (begin
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (contract-call? asset transfer id tx-sender TREASURY_ADDRESS))
    (print { event: "sip9-deposit", assetContract: (contract-of asset), tokenId: id, caller: tx-sender })
    (ok true)
  )
)

(define-public (sip10-deposit (asset <sip10>) (amount uint))
  (begin
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (contract-call? asset transfer amount tx-sender TREASURY_ADDRESS none))
    (print { event: "sip10-deposit", amount: amount, assetContract: (contract-of asset), caller: tx-sender })
    (ok true)
  )
)

(define-public (stx-transfer (amount uint) (recipient principal) (memo (optional (buff 34))))
  (begin
    (try! (is-dao-or-extension))
    (match memo with-memo (print with-memo) 0x)
    (try! (as-contract (stx-transfer? amount TREASURY_ADDRESS recipient)))
    (print { event: "stx-transfer", amount: amount, recipient: recipient, memo: (if (is-none memo) none (some memo)), caller: tx-sender })
    (ok true)
  )
)

(define-public (sip9-transfer (tokenId uint) (recipient principal) (asset <sip9>))
  (begin
    (try! (is-dao-or-extension))
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (as-contract (contract-call? asset transfer tokenId TREASURY_ADDRESS recipient)))
    (print { event: "sip9-transfer", tokenId: tokenId, recipient: recipient, caller: tx-sender })
    (ok true)
  )
)

(define-public (sip10-transfer (amount uint) (recipient principal) (memo (optional (buff 34))) (asset <sip10>))
  (begin
    (try! (is-dao-or-extension))
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (as-contract (contract-call? asset transfer amount TREASURY_ADDRESS recipient memo)))
    (print { event: "sip10-transfer", assetContract: (contract-of asset), recipient: recipient, caller: tx-sender })
    (ok true)
  )
)

(define-public (stx-transfer-many (payload (list 200 { amount: uint, recipient: principal, memo: (optional (buff 34)) })))
  (begin
    (try! (is-dao-or-extension))
    (as-contract (fold stx-transfer-many-iter payload (ok true)))
  )
)

(define-public (sip9-transfer-many (payload (list 200 { tokenId: uint, recipient: principal })) (asset <sip9>))
  (begin
    (try! (is-dao-or-extension))
    (ok (as-contract (fold sip9-transfer-many-iter payload asset)))
  )
)

(define-public (sip10-transfer-many (payload (list 200 { amount: uint, recipient: principal, memo: (optional (buff 34)) })) (asset <sip10>))
  (begin
    (try! (is-dao-or-extension))
    (ok (as-contract (fold sip10-transfer-many-iter payload asset)))
  )
)

(define-read-only (is-whitelisted (assetContract principal))
  (default-to false (get-whitelisted-asset assetContract))
)

(define-read-only (get-whitelisted-asset (assetContract principal))
  (map-get? WhitelistedAssets assetContract)
)

(define-read-only (get-balance)
  (stx-get-balance TREASURY_ADDRESS)
)

(define-private (set-whitelist-iter (data { token: principal, enabled: bool }))
  (begin
    (print { event: "whitelist", token: (get token data), enabled: (get enabled data) })
    (map-set WhitelistedAssets (get token data) (get enabled data))
  )
)

(define-private (stx-transfer-many-iter (data { amount: uint, recipient: principal, memo: (optional (buff 34)) }) (previousResult (response bool uint)))
  (begin
    (try! previousResult)
    (match (get memo data) with-memo (print with-memo) 0x)
    (print { event: "stx-transfer", amount: (get amount data), recipient: (get recipient data), memo: (if (is-none (get memo data)) none (some (get memo data))), caller: tx-sender })
    (stx-transfer? (get amount data) TREASURY_ADDRESS (get recipient data))
  )
)

(define-private (sip9-transfer-many-iter (data { tokenId: uint, recipient: principal }) (asset <sip9>))
  (begin
    (unwrap-panic (contract-call? asset transfer (get tokenId data) tx-sender (get recipient data)))
    asset
  )
)

(define-private (sip10-transfer-many-iter (data { amount: uint, recipient: principal, memo: (optional (buff 34)) }) (asset <sip10>))
  (begin
    (unwrap-panic (contract-call? asset transfer (get amount data) tx-sender (get recipient data) (get memo data)))
    asset
  )
)

(define-public (callback (sender principal) (memo (buff 34)))
  (ok true)
)
`;

export const investmentClub = (
  nftMembershipContract: string,
  governanceTokenContract: string,
  vaultContract: string,
  startWindow: string,
  minimumDepositAmount: string,
) => `
(impl-trait '${traitPrincipal}.extension-trait.extension-trait)

(define-constant ERR_UNAUTHORIZED (err u2300))
(define-constant ERR_DEPOSIT_WINDOW_ALREADY_OPEN (err u2301))
(define-constant ERR_DEPOSIT_WINDOW_CLOSED (err u2302))
(define-constant ERR_MINIMUM_DEPOSIT_NOT_REACHED (err u2303))
(define-constant ERR_REACHED_MAX_RAISE_AMOUNT (err u2304))
(define-constant ERR_CLAIM_WINDOW_NOT_OPEN (err u2305))
(define-constant ERR_UNKNOWN_PARAMETER (err u2306))

(define-data-var roundId uint u0)

(define-map Parameters (string-ascii 34) uint)
(define-map DepositRounds uint { cap: uint, closesAt: uint, raised: uint })

(map-set Parameters "startWindow" u${startWindow})
(map-set Parameters "minimumDepositAmount" u${minimumDepositAmount})

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-parameter (parameter (string-ascii 34)) (value uint))
  (begin
    (try! (is-dao-or-extension))
    (try! (get-parameter parameter))
    (ok (map-set Parameters parameter value))
  )
)

(define-public (start)
  (begin
    (asserts! (is-eq (var-get roundId) u0) ERR_DEPOSIT_WINDOW_ALREADY_OPEN)
    (let
      (
        (nextRoundId (+ (var-get roundId) u1))
      )
      (var-set roundId nextRoundId)
      (ok (map-insert DepositRounds nextRoundId { cap: (* (pow u10 u6) u10000), closesAt: (+ block-height (try! (get-parameter "startWindow"))), raised: u0 }))
    )
  )
)

(define-public (deposit (amount uint) (membershipTokenId uint))
  (begin
    (asserts! (is-eq tx-sender (unwrap! (contract-call? '${nftMembershipContract} get-owner membershipTokenId) (err u1))) ERR_UNAUTHORIZED)
    (asserts! (is-eq true (is-raising)) ERR_DEPOSIT_WINDOW_CLOSED)
    (asserts! (<= (+ amount (unwrap-panic (get-raised (var-get roundId)))) (unwrap-panic (get-cap (var-get roundId)))) ERR_REACHED_MAX_RAISE_AMOUNT)
    (asserts! (>= amount (try! (get-parameter "minimumDepositAmount"))) ERR_MINIMUM_DEPOSIT_NOT_REACHED)
    (map-set DepositRounds (var-get roundId)
      (merge (unwrap-panic (get-round (var-get roundId))) { raised: (+ amount (unwrap-panic (get-raised (var-get roundId)))) })
    )
    (try! (contract-call? '${governanceTokenContract} mint amount tx-sender))
    (stx-transfer? amount tx-sender '${vaultContract})
  )
)

(define-public (ragequit (membershipTokenId uint))
  (begin
    (asserts! (is-eq false (is-raising)) ERR_CLAIM_WINDOW_NOT_OPEN)
    (try! (contract-call? '${vaultContract} stx-transfer (get-payout tx-sender) tx-sender none))
    (try! (contract-call? '${nftMembershipContract} burn membershipTokenId tx-sender))
    (contract-call? '${governanceTokenContract} burn (unwrap-panic (contract-call? '${governanceTokenContract} get-balance tx-sender)) tx-sender)
  )
)

(define-read-only (get-ownership-percentage (member principal))
  (let
    (
      (totalSupply (unwrap-panic (contract-call? '${governanceTokenContract} get-total-supply)))
      (memberTokens (unwrap-panic (contract-call? '${governanceTokenContract} get-balance member)))
    )
    (if (is-eq memberTokens u0)
      u0
      (/ (* (pow u10 u6) memberTokens) totalSupply)
    )
  )
)

(define-public (distribute (member principal))
  (begin
    (try! (is-dao-or-extension))
    (let
      (
        (payout (get-payout member))
      )
      (print { event: "distribute", member: member, payout: payout })
      (ok (contract-call? '${vaultContract} stx-transfer payout member none))
    )
  )
)

(define-public (distribute-many (members (list 99 principal)))
  (begin
    (try! (is-dao-or-extension))
    (ok (map distribute-many-iter members))
  )
)

(define-private (distribute-many-iter (member principal))
  (distribute member)
)

(define-read-only (get-treasury-balance (blockHeight uint))
  (at-block
    (unwrap! (get-block-info? id-header-hash blockHeight) u0) (contract-call? '${vaultContract} get-balance)
  )
)

(define-read-only (get-payout (member principal))
  (let
    (
      (ownershipPercentage (get-ownership-percentage member))
      (treasuryBalance (get-treasury-balance block-height))
    )
    (/ (* treasuryBalance ownershipPercentage) (pow u10 u6))
  )
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
  (ok (unwrap! (map-get? Parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (get-round (id uint))
  (map-get? DepositRounds id)
)

(define-read-only (get-cap (id uint))
  (get cap (get-round id))
)

(define-read-only (get-closes-at (id uint))
  (get closesAt (get-round id))
)

(define-read-only (get-raised (id uint))
  (get raised (get-round id))
)

(define-read-only (is-raising)
  (<= block-height (unwrap! (get-closes-at (var-get roundId)) false))
)

(define-public (callback (sender principal) (memo (buff 34)))
  (ok true)
)
`;

export const submissionExtension = (
  nftMembershipContract: string,
  investmentClubContract: string,
  votingContract: string,
  proposalDuration: string,
  minimumProposalStartDelay: string,
  maximumProposalStartDelay: string,
) => `
(impl-trait '${traitPrincipal}.extension-trait.extension-trait)

(use-trait proposal-trait '${traitPrincipal}.proposal-trait.proposal-trait)
(use-trait sip10-trait '${traitPrincipal}.sip10-trait.sip10-trait)

(define-constant ERR_UNAUTHORIZED (err u2600))
(define-constant ERR_UNKNOWN_PARAMETER (err u2601))
(define-constant ERR_PROPOSAL_MINIMUM_START_DELAY (err u2602))
(define-constant ERR_PROPOSAL_MAXIMUM_START_DELAY (err u2603))
(define-constant ERR_PROPOSALS_LOCKED (err u2604))

(define-map Parameters (string-ascii 34) uint)

(map-set Parameters "proposalDuration" u${proposalDuration})
(map-set Parameters "minimumProposalStartDelay" u${minimumProposalStartDelay})
(map-set Parameters "maximumProposalStartDelay" u${maximumProposalStartDelay})

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-parameter (parameter (string-ascii 34)) (value uint))
  (begin
    (try! (is-dao-or-extension))
    (try! (get-parameter parameter))
    (ok (map-set Parameters parameter value))
  )
)

(define-private (set-parameters-iter (item { parameter: (string-ascii 34), value: uint }) (previous (response bool uint)))
  (begin
    (try! previous)
    (try! (get-parameter (get parameter item)))
    (ok (map-set Parameters (get parameter item) (get value item)))
  )
)

(define-public (set-parameters (parameter-list (list 200 { parameter: (string-ascii 34), value: uint })))
  (begin
    (try! (is-dao-or-extension))
    (fold set-parameters-iter parameter-list (ok true))
  )
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
  (ok (unwrap! (map-get? Parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (can-propose (who principal) (tokenId uint))
  (is-eq who (unwrap! (contract-call? '${nftMembershipContract} get-owner tokenId) false))
)

(define-public (propose (proposal <proposal-trait>) (startBlockHeight uint) (tokenId uint))
  (begin
    (asserts! (>= startBlockHeight (+ block-height (try! (get-parameter "minimumProposalStartDelay")))) ERR_PROPOSAL_MINIMUM_START_DELAY)
    (asserts! (<= startBlockHeight (+ block-height (try! (get-parameter "maximumProposalStartDelay")))) ERR_PROPOSAL_MAXIMUM_START_DELAY)
    (asserts! (is-eq false (contract-call? '${investmentClubContract} is-raising)) ERR_PROPOSALS_LOCKED)
    (asserts! (can-propose tx-sender tokenId) ERR_UNAUTHORIZED)
    (contract-call? '${votingContract} add-proposal
      proposal
      {
        startBlockHeight: startBlockHeight,
        endBlockHeight: (+ startBlockHeight (try! (get-parameter "proposalDuration"))),
        proposer: tx-sender
      }
    )
  )
)

(define-public (callback (sender principal) (memo (buff 34)))
  (ok true)
)
`;

export const votingExtension = (
  nftMembershipContract: string,
  governanceTokenContract: string,
  executionDelay: string,
) => `
(impl-trait '${traitPrincipal}.extension-trait.extension-trait)

(use-trait proposal-trait '${traitPrincipal}.proposal-trait.proposal-trait)
(use-trait sip10-trait '${traitPrincipal}.sip10-trait.sip10-trait)

(define-constant ERR_UNAUTHORIZED (err u2500))
(define-constant ERR_UNKNOWN_PARAMETER (err u2501))
(define-constant ERR_PROPOSAL_ALREADY_EXECUTED (err u2502))
(define-constant ERR_PROPOSAL_ALREADY_EXISTS (err u2503))
(define-constant ERR_UNKNOWN_PROPOSAL (err u2504))
(define-constant ERR_PROPOSAL_ALREADY_CONCLUDED (err u2505))
(define-constant ERR_PROPOSAL_INACTIVE (err u2506))
(define-constant ERR_END_BLOCK_HEIGHT_NOT_REACHED (err u2507))
(define-constant ERR_ALREADY_VOTED (err u2508))
(define-constant ERR_BLOCK_HASH_NOT_AVAILABLE (err u2509))

(define-map Proposals
  principal
  {
    votesFor: uint,
    votesAgainst: uint,
    startBlockHeight: uint,
    endBlockHeight: uint,
    concluded: bool,
    passed: bool,
    proposer: principal
  }
)

(define-map MemberVotes { proposal: principal, voter: principal, tokenId: uint } uint)
(define-map parameters (string-ascii 34) uint)

(map-set parameters "executionDelay" u${executionDelay})

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-parameter (parameter (string-ascii 34)) (value uint))
  (begin
    (try! (is-dao-or-extension))
    (try! (get-parameter parameter))
    (ok (map-set parameters parameter value))
  )
)

(define-public (add-proposal (proposal <proposal-trait>) (data {startBlockHeight: uint, endBlockHeight: uint, proposer: principal}))
  (begin
    (try! (is-dao-or-extension))
    (asserts! (is-none (contract-call? .core-dao executed-at proposal)) ERR_PROPOSAL_ALREADY_EXECUTED)
    (asserts! (map-insert Proposals (contract-of proposal) (merge { votesFor: u0, votesAgainst: u0, concluded: false, passed: false } data)) ERR_PROPOSAL_ALREADY_EXISTS)
    (ok (print { event: "propose", proposal: proposal, startBlockHeight: (get startBlockHeight data), endBlockHeight: (get endBlockHeight data), proposer: tx-sender }))
  )
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
  (ok (unwrap! (map-get? parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (get-proposal-data (proposal principal))
  (map-get? Proposals proposal)
)

(define-read-only (get-voting-power (voter principal) (blockHeight uint))
  (at-block
    (unwrap! (get-block-info? id-header-hash blockHeight) u0) (unwrap! (contract-call? '${governanceTokenContract} get-balance voter) u0)
  )
)

(define-read-only (get-current-votes (proposal principal) (voter principal) (tokenId uint))
  (default-to u0 (map-get? MemberVotes { proposal: proposal, voter: voter, tokenId: tokenId }))
)

(define-read-only (can-vote (who principal) (tokenId uint))
  (is-eq who (unwrap! (contract-call? '${nftMembershipContract} get-owner tokenId) false))
)

(define-public (vote (for bool) (proposal principal) (tokenId uint))
  (let
    (
      (proposalData (unwrap! (map-get? Proposals proposal) ERR_UNKNOWN_PROPOSAL))
      (amount (get-voting-power tx-sender (get startBlockHeight proposalData)))
    )
    (asserts! (>= block-height (get startBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
    (asserts! (< block-height (get endBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
    (asserts! (can-vote tx-sender tokenId) ERR_UNAUTHORIZED)
    (asserts! (map-insert MemberVotes { proposal: proposal, voter: tx-sender, tokenId: tokenId } (+ u0 amount)) ERR_ALREADY_VOTED)
    (map-set Proposals proposal
      (if for
        (merge proposalData { votesFor: (+ (get votesFor proposalData) amount) })
        (merge proposalData { votesAgainst: (+ (get votesAgainst proposalData) amount) })
      )
    )
    (ok (print { event: "vote", proposal: proposal, voter: tx-sender, for: for, amount: amount }))
  )
)

(define-public (conclude (proposal <proposal-trait>))
  (let
    (
      (proposalData (unwrap! (map-get? Proposals (contract-of proposal)) ERR_UNKNOWN_PROPOSAL))
      (totalVotes (+ (get votesFor proposalData) (get votesAgainst proposalData)))
      (passed (and (> totalVotes u0) (> (get votesFor proposalData) (get votesAgainst proposalData))))
    )
    (asserts! (not (get concluded proposalData)) ERR_PROPOSAL_ALREADY_CONCLUDED)
    (asserts! (>= block-height (+ (try! (get-parameter "executionDelay")) (get endBlockHeight proposalData))) ERR_END_BLOCK_HEIGHT_NOT_REACHED)
    (map-set Proposals (contract-of proposal) (merge proposalData { concluded: true, passed: passed }))
    (print { event: "conclude", proposal: proposal, totalVotes: totalVotes, passed: passed })
    (and passed (try! (contract-call? .core-dao execute proposal tx-sender)))
    (ok passed)
  )
)

(define-public (callback (sender principal) (memo (buff 34)))
  (ok true)
)
`;
