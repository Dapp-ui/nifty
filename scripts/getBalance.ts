import * as hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';

hre.ethers.provider
  .getBalance('0x5e7610698ba465973C11A607eAf43b7f1733D947')
  .then((e) => console.log('THE BALANCE: ', e));
