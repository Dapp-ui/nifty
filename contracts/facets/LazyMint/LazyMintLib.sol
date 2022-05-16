// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721ALib} from "../ERC721A/ERC721ALib.sol";

library LazyMintLib {
    bytes32 constant LAZY_MINT_STORAGE_POSITION =
        keccak256("lazy.mint.storage");
    struct LazyMintStorage {
        uint256 maxSupply;
        bool maxSupplyLocked;
        uint256 publicMintPrice;
    }

    function lazyMintStorage()
        internal
        pure
        returns (LazyMintStorage storage s)
    {
        bytes32 position = LAZY_MINT_STORAGE_POSITION;
        assembly {
            s.slot := position
        }
    }

    function _safeMint(address to, uint256 quantity) internal {
        uint256 max = lazyMintStorage().maxSupply;
        require(
            max == 0 || max > (ERC721ALib.totalSupply() + quantity),
            "Mint exceeds max supply"
        );
        ERC721ALib._safeMint(to, quantity);
    }

    function maxSupply() internal view returns (uint256) {
        return lazyMintStorage().maxSupply;
    }

    function setMaxSupply(uint256 _maxSupply) internal {
        require(
            _maxSupply <= ERC721ALib.totalSupply(),
            "Cannot set max supply less than total supply"
        );
        require(
            !lazyMintStorage().maxSupplyLocked,
            "Max supply has been locked"
        );

        lazyMintStorage().maxSupply = _maxSupply;
    }

    function setPublicMintPrice(uint256 _mintPrice) internal {
        lazyMintStorage().publicMintPrice = _mintPrice;
    }

    function mintPrice() internal view returns (uint256) {
        return lazyMintStorage().publicMintPrice;
    }
}
