import type { Network } from '../types';

const rpcUrlFromNetwork = (network: Network): string => {
  switch (network) {
    case 'mumbai':
      return 'https://polygon-mumbai.g.alchemy.com/v2/7LaNahS05bMkhbsmGHBJ4TAII4TGm7EF';
    case 'goerli':
      return '';
    case 'polygon':
      return 'https://polygon-mainnet.g.alchemy.com/v2/u4t-e_ZAM08ir-1nryKpU-t7bDi2Zgjp';
    case 'hardhat':
      return 'http://127.0.0.1:8545';
    case 'rinkeby':
      return 'https://eth-rinkeby.alchemyapi.io/v2/mMJnSv1oY4dEumXcmf4PahuUZRN_mOlW';
    case 'mainnet':
      return '';
  }
};

export default rpcUrlFromNetwork;
