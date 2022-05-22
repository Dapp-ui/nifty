// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PrintERC165Bytes {
    constructor() {
        console.log("ERC165:");
        console.logBytes4(type(IERC165).interfaceId);
        console.log("ERC721:");
        console.logBytes4(type(IERC721).interfaceId);
    }
}
