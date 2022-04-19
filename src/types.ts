export type Network =
  | 'mumbai'
  | 'goerli'
  | 'mainnet'
  | 'polygon'
  | 'hardhat'
  | 'rinkeby';

export enum SaleState {
  CLOSED = 0,
  ALLOW_LIST = 1,
  OPEN = 2,
  DUTCH_AUCTION = 3,
  SOLD_OUT = 4,
}

export type CurrencyUnit = 'ether' | 'gwei' | 'wei';
