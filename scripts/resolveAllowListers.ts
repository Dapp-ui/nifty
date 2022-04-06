import * as ethers from 'ethers';

const allowListers = [];

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.alchemyapi.io/v2/CwVBW1_D3Q-PIzkEXecoFvYT5eIF6tlB'
);

const resolveENS = async (name) => {
  var address = await provider.resolveName(name);

  return address;
};

const resolveAddresses = async () => {
  const resolved = [];
  for (let address of allowListers) {
    address = address.toLowerCase();
    if (address.indexOf('0x') !== -1) {
      resolved.push(address);
    } else if (address.indexOf('.eth') !== -1) {
      const resolvedAddress = await resolveENS(address);
      console.log('RESOLVED ADDRESS', address, resolvedAddress);
      resolved.push(resolvedAddress);
    }
  }

  console.log('RESOLVED: ', JSON.stringify(resolved));
};

resolveAddresses();
