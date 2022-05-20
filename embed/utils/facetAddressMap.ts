import lazyMintFacet from '../../artifacts/contracts/facets/LazyMint/LazyMintFacet.sol/LazyMintFacet.json';
import baseDiamondFacet from '../../artifacts/contracts/facets/DiamondClone/BaseDiamondCloneFacet.sol/BaseDiamondCloneFacet.json';
import paymentSplitterFacet from '../../artifacts/contracts/facets/PaymentSplitter/PaymentSplitterFacet.sol/PaymentSplitterFacet.json';
import baseNFTFacet from '../../artifacts/contracts/facets/BaseNFTFacet.sol/BaseNFTFacet.json';

const facetAddressMap = {
  '0x3fcc7cda97fcb816a3261d8d064574bae6f79878': {
    abi: baseDiamondFacet.abi,
    type: 'base-diamond',
  },
  '0x91e15d89e13801a46f8b3a8396f394ffa73502f5': {
    abi: baseNFTFacet.abi,
    type: 'base-nft',
  },
  '0xe1b780c43d0de47252bf3f17f7402c941e226b3c': {
    abi: paymentSplitterFacet.abi,
    type: 'payment-splitter',
  },
  '0x9df1f8d14817df586220af50f31ccbc180553af5': {
    abi: lazyMintFacet.abi,
    type: 'lazy-mint',
  },
};

export const idToFacetAddress: { [key: string]: string } = Object.keys(
  facetAddressMap
).reduce((acc, key) => {
  const id = facetAddressMap[key].type;
  return {
    ...acc,
    [id]: key,
  };
}, {});

export default facetAddressMap;
