import { ethers } from 'ethers';

function isWriteProvider(
  provider: ethers.providers.Provider
): provider is ethers.providers.Web3Provider {
  return (
    (provider as ethers.providers.Web3Provider).jsonRpcFetchFunc !== undefined
  );
}

export default isWriteProvider;
