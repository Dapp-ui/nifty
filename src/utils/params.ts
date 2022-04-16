import type { Network } from '../types';

export interface NiftyParams {
  network: Network;
  contractAddress: string;
}

const defaultParams: NiftyParams = {
  network: 'rinkeby',
  contractAddress: '0x5B357E8178683c487b378c06Ad533bbbb4f938C6',
};

const dataElement = document.getElementById('niftyDataParams');

const paramsFromDataAttributes = Object.keys(defaultParams).reduce(
  (acc, key) => {
    const attribute = dataElement[key];

    return {
      ...acc,
      [key]: attribute || defaultParams[key],
    };
  },
  {}
);

const params: NiftyParams = {
  ...defaultParams,
  ...paramsFromDataAttributes,
};

export default params;
