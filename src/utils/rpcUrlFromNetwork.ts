import { Network } from '../types';

const rpcUrlFromNetwork = (network: Network): string => {
  switch (network) {
    case 'mumbai':
      return 'https://polygon-mumbai.g.alchemy.com/v2/7LaNahS05bMkhbsmGHBJ4TAII4TGm7EF';
    case 'goerli':
      return '';
    case 'polygon':
      return 'https://polygon-mainnet.g.alchemy.com/v2/u4t-e_ZAM08ir-1nryKpU-t7bDi2Zgjp';
    case 'mainnet':
      return '';
  }
};

export default rpcUrlFromNetwork;
