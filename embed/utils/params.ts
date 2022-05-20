import type { Network } from '../types';

export interface NiftyParams {
  network: Network;
  contractAddress?: string;
  mintButtonSelector: string;
  connectButtonSelector: string;
  mintButtonCustomStyles: string;
  connectWalletButtonCustomStyles: string;
}

const defaultParams: NiftyParams = {
  network: 'rinkeby',
  mintButtonSelector: '#mintButton',
  connectButtonSelector: '#connectWalletButton',
  mintButtonCustomStyles: '',
  connectWalletButtonCustomStyles: '',
};

const paramsFromWindow = Object.keys(defaultParams).reduce((acc, key) => {
  const attribute = //@ts-ignore
    typeof window !== 'undefined' ? window.niftyParams[key] : null;

  return {
    ...acc,
    [key]: attribute || defaultParams[key],
  };
}, {});

const params: NiftyParams = {
  ...defaultParams,
  ...paramsFromWindow,
};

export default params;
