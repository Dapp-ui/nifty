// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import {ERC721ALib} from "./ERC721A/ERC721ALib.sol";

library BaseNFTLib {
    struct BaseNFTStorage {
        uint256 saleState;
        string baseURI;
    }

    function baseNFTStorage()
        internal
        pure
        returns (BaseNFTStorage storage es)
    {
        bytes32 position = keccak256("base.nft.storage");
        assembly {
            es.slot := position
        }
    }

    function saleState() internal view returns (uint256) {
        return baseNFTStorage().saleState;
    }

    function setSaleState(uint256 _saleState) internal {
        baseNFTStorage().saleState = _saleState;
    }

    function setBaseURI(string memory _baseURI) internal {
        baseNFTStorage().baseURI = _baseURI;
    }
}
