// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AccessControlModifiers} from "../AccessControl/AccessControlModifiers.sol";
import {PaymentSplitterFacet} from "../PaymentSplitter/PaymentSplitterFacet.sol";
import {SaleStateModifiers} from "../BaseNFTModifiers.sol";
import {LazyMintLib} from "./LazyMintLib.sol";

contract LazyMintFacet is
    AccessControlModifiers,
    PaymentSplitterFacet,
    SaleStateModifiers
{
    function setMaxSupply(uint256 _maxSupply) public onlyOperator {
        return LazyMintLib.setMaxSupply(_maxSupply);
    }

    function maxSupply() public view returns (uint256) {
        return LazyMintLib.maxSupply();
    }

    function setPublicMintPrice(uint256 _mintPrice) public onlyOperator {
        LazyMintLib.setPublicMintPrice(_mintPrice);
    }

    function mintPrice() public view {
        LazyMintLib.mintPrice();
    }

    function publicMint(uint256 quantity) public payable onlyAtSaleState(1) {
        require(
            msg.value >= quantity * LazyMintLib.mintPrice(),
            "Insufficient funds to mint"
        );
        LazyMintLib._safeMint(msg.sender, quantity);
    }
}
