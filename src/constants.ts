export enum VerificationStatus {
  FAILED = 'Fail - Unable to verify',
  SUCCESS = 'Pass - Verified',
  PENDING = 'Pending in queue',
  ALREADY_VERIFIED = 'Contract source code already verified',
}

export type Network = {
  name: string;
  chainId: number;
  etherscanApiURL: string;
}

export const NETWORKS: Network[] = [
  {name: 'mainnet', chainId: 1, etherscanApiURL: 'https://api.etherscan.io/api'},
  {name: 'ropsten', chainId: 3, etherscanApiURL: 'https://api-ropsten.etherscan.io/api'},
  {name: 'rinkeby', chainId: 4, etherscanApiURL: 'https://api-rinkeby.etherscan.io/api'},
  {name: 'goerli', chainId: 5, etherscanApiURL: 'https://api-goerli.etherscan.io/api'},
  {name: 'kovan', chainId: 42, etherscanApiURL: 'https://api-kovan.etherscan.io/api'},
  {name: 'bsc', chainId: 56, etherscanApiURL: 'https://api.bscscan.com/api'},
  {name: 'bsc_testnet', chainId: 97, etherscanApiURL: 'https://api-testnet.bscscan.com/api'},
  {name: 'arbitrum', chainId: 42161, etherscanApiURL: 'https://api.arbiscan.io/api'},
  {name: 'arbitrum_rinkbedy', chainId: 421611, etherscanApiURL: 'https://api-testnet.arbiscan.io/api'},
  {name: 'avalanche', chainId: 43114, etherscanApiURL: 'https://snowtrace.io/apis'},
  {name: 'avalanche_fuji', chainId: 43113, etherscanApiURL: 'https://testnet.snowtrace.io/api'},
]

export const SOURCIFY_API = 'https://sourcify.dev/server/'
