import type { Network } from '../types';

const blockExplorerFromNetwork = (network: Network): string => {
  switch (network) {
    case 'mumbai':
      return 'https://mumbai.polygonscan.com';
    case 'goerli':
      return 'https://goerli.etherscan.io';
    case 'polygon':
      return 'https://polygonscan.com';
    case 'hardhat':
      return 'http://127.0.0.1:8545';
    case 'rinkeby':
      return 'https://rinkeby.etherscan.io';
    case 'mainnet':
      return 'https://etherscan.io';
  }
};

export default blockExplorerFromNetwork;
