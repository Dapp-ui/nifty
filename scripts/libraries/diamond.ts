import { ethers } from 'ethers';

const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 };

export const deployTest1Facet = async () => {
  const Test1Facet = await ethers.getContractFactory('Test1Facet');
  const test1Facet = await Test1Facet.deploy();
  await test1Facet.deployed();
  return test1Facet;
};

export const getDecodedEventsFromContract = async (contractInstance) => {
  const events = await contractInstance.queryFilter(
    { address: contractInstance.address },
    0,
    999
  );

  // roundabout way of testing events in constructor
  const iface = new ethers.utils.Interface(cutAbi.abi);

  const decodedEvents = events
    .map((event) => {
      try {
        const decodedArr = iface.parseLog(event);
        return { ...decodedArr };
      } catch (_) {
        // event defined on different facet ABI
        return null;
      }
    })
    .filter((e) => !!e);

  return decodedEvents;
};

// get function selectors from ABI
export function getSelectors(contract) {
  const signatures = Object.keys(contract.interface.functions);
  const selectors = signatures.reduce((acc, val) => {
    if (val !== 'init(bytes)') {
      acc.push(contract.interface.getSighash(val));
    }
    return acc;
  }, []);
  selectors.contract = contract;
  selectors.remove = remove;
  selectors.get = get;
  return selectors;
}

// get function selector from function signature
export function getSelector(func) {
  const abiInterface = new ethers.utils.Interface([func]);
  return abiInterface.getSighash(ethers.utils.Fragment.from(func));
}

// used with getSelectors to remove selectors from an array of selectors
// functionNames argument is an array of function signatures
export function remove(functionNames) {
  const selectors = this.filter((v) => {
    for (const functionName of functionNames) {
      if (v === this.contract.interface.getSighash(functionName)) {
        return false;
      }
    }
    return true;
  });
  selectors.contract = this.contract;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

// used with getSelectors to get selectors from an array of selectors
// functionNames argument is an array of function signatures
function get(functionNames) {
  const selectors = this.filter((v) => {
    for (const functionName of functionNames) {
      if (v === this.contract.interface.getSighash(functionName)) {
        return true;
      }
    }
    return false;
  });
  selectors.contract = this.contract;
  selectors.remove = this.remove;
  selectors.get = this.get;
  return selectors;
}

// remove selectors using an array of signatures
export function removeSelectors(selectors, signatures) {
  const iface = new ethers.utils.Interface(
    signatures.map((v) => 'function ' + v)
  );
  const removeSelectors = signatures.map((v) => iface.getSighash(v));
  selectors = selectors.filter((v) => !removeSelectors.includes(v));
  return selectors;
}

// find a particular address position in the return value of diamondLoupeFacet.facets()
export function findAddressPositionInFacets(facetAddress, facets) {
  for (let i = 0; i < facets.length; i++) {
    if (facets[i].facetAddress === facetAddress) {
      return i;
    }
  }
}

export default {};
