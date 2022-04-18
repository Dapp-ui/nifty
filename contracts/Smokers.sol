// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "hardhat/console.sol";

contract Smokers is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    uint256 public constant CLOSED_SALE = 0;
    uint256 public constant ALLOWLIST_SALE = 1;
    uint256 public constant PUBLIC_SALE = 2;

    uint256 public saleState = CLOSED_SALE;

    Counters.Counter private _tokenIds;
    mapping(address => uint256) private _allowList;

    address payable private _wallet;
    address payable private _devWallet;

    uint256 public maxSupply;
    uint256 public allowListPrice;
    uint256 public publicMintPrice;

    // basis of 100
    uint256 private _devShare;
    string baseURI = "ipfs://";

    constructor(
        address payable wallet,
        address payable devWallet,
        uint256 initialMaxSupply,
        uint256 initialAllowListPrice,
        uint256 initialPublicMintPrice,
        uint256 devShare
    ) ERC721("The Stoners", "STONER") {
        _wallet = wallet;
        _devWallet = devWallet;
        maxSupply = initialMaxSupply;
        allowListPrice = initialAllowListPrice;
        publicMintPrice = initialPublicMintPrice;

        _devShare = devShare;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function devMint(uint256 count) public payable onlyOwner {
        _mintMany(count);
    }

    function mint(uint256 count) public payable {
        require(saleState != CLOSED_SALE, "Smokers: sale is closed");

        if (saleState == PUBLIC_SALE) {
            _mintFromPublicSale(count);
            return;
        }

        _mintFromAllowList(count);
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
        require(
            newMaxSupply >= _tokenIds.current(),
            "Smokers: cannot set max supply less than current minted supply"
        );
        maxSupply = newMaxSupply;
    }

    function setAllowListPrice(uint256 newPrice) public onlyOwner {
        allowListPrice = newPrice;
    }

    function setPublicMintPrice(uint256 newPrice) public onlyOwner {
        publicMintPrice = newPrice;
    }

    function _mintFromAllowList(uint256 count) internal {
        require(
            msg.value >= allowListPrice * count,
            "Smokers: not enough funds sent"
        );

        uint256 numAllowedMints = _allowList[_msgSender()];

        require(
            numAllowedMints >= count,
            "Smokers: sender does not have enough allow list entries"
        );

        _allowList[_msgSender()] = numAllowedMints - count;

        _mintMany(count);
    }

    function _mintFromPublicSale(uint256 count) internal {
        require(
            msg.value >= publicMintPrice * count,
            "Smokers: not enough funds sent"
        );
        _mintMany(count);
    }

    function _mintMany(uint256 count) internal {
        for (uint256 i = 0; i < count; i++) {
            _mint();
        }
    }

    function _mint() internal {
        require(_tokenIds.current() < maxSupply, "Smokers: none left");
        address recipient = _msgSender();

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(recipient, newItemId);
    }

    function setSaleState(uint256 nextSaleState) public onlyOwner {
        require(
            nextSaleState >= 0 && nextSaleState <= 2,
            "Smokers: sale state out of range"
        );
        saleState = nextSaleState;
    }

    function setAllowListEntries(address allowLister, uint256 amount)
        public
        onlyOwner
    {
        _allowList[allowLister] = amount;
    }

    function setMultipleAllowListEntries(
        address[] memory allowListers,
        uint256 amount
    ) public onlyOwner {
        for (uint256 i; i < allowListers.length; i++) {
            _allowList[allowListers[i]] = amount;
        }
    }

    function numAllowListEntries(address allowLister)
        public
        view
        returns (uint256)
    {
        return _allowList[allowLister];
    }

    function totalMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        uint256 devPayment = (balance * _devShare) / 100;
        uint256 remainder = balance - devPayment;

        (bool success, ) = _devWallet.call{value: devPayment}("");
        (bool success2, ) = _wallet.call{value: remainder}("");

        require(success && success2, "Smokers: withdrawl failed");
    }

    function allOwners() external view returns (address[] memory) {
        address[] memory _allOwners = new address[](maxSupply + 1);

        for (uint256 i = 1; i <= maxSupply; i++) {
            if (_exists(i)) {
                address owner = ownerOf(i);
                _allOwners[i] = owner;
            } else {
                _allOwners[i] = address(0x0);
            }
        }

        return _allOwners;
    }
}
