import { Network } from '../types';

const chainIdFromNetwork = (network: Network): string => {
  switch (network) {
    case 'mumbai':
      return '0x13881';
    case 'goerli':
      return '0x1A4';
    case 'polygon':
      return '0x89';
    case 'mainnet':
      return '0x1';
  }
};

export default chainIdFromNetwork;
