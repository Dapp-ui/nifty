import type { Network } from '../types';

export interface NiftyParams {
  network: Network;
  contractAddress: string;
  buttonTextColor: string;
  buttonBgColor: string;
  mintButtonSelector: string;
  connectButtonSelector: string;
  mintButtonCustomStyles: string;
}

const defaultParams: NiftyParams = {
  network: 'rinkeby',
  contractAddress: '0x5B357E8178683c487b378c06Ad533bbbb4f938C6',
  buttonTextColor: '#ffffff',
  buttonBgColor: '#000000',
  mintButtonSelector: '#mintButton',
  connectButtonSelector: '#connectWalletButton',
  mintButtonCustomStyles: '',
};

const paramsFromWindow = Object.keys(defaultParams).reduce((acc, key) => {
  //@ts-ignore
  const attribute = window.niftyParams[key];

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
