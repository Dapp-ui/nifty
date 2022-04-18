// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "hardhat/console.sol";

contract Nifty is ERC721URIStorage, ERC2981, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(address => uint256) private _allowList;

    address payable private _wallet;

    uint256 public maxSupply;
    uint256 public allowListPrice;

    // Dutch Auction values
    uint256 public auctionStartAt = 0; // zero if auction has not started

    uint256 public maxMintPerAddress = 10;
    uint256 public allowListSize = 10000;

    uint256 public dutchAuctionDuration;
    uint256 public dutchAuctionStartPrice;
    uint256 public dutchAuctionEndPrice;
    uint256 public dutchAuctionPriceDropInterval;

    bool public isSaleLive = false;
    string baseURI = "ipfs://";

    constructor(
        address payable wallet,
        uint256 initialMaxSupply,
        uint256 initialAllowListPrice,
        uint256 initialDutchAuctionDuration,
        uint256 initialDutchAuctionStartPrice,
        uint256 initialDutchAuctionEndPrice,
        uint256 initialDutchAuctionPriceDropInterval,
        uint96 royalty
    ) ERC721("NAME", "TOKEN") {
        _wallet = wallet;
        maxSupply = initialMaxSupply;
        allowListPrice = initialAllowListPrice;
        dutchAuctionDuration = initialDutchAuctionDuration;
        dutchAuctionStartPrice = initialDutchAuctionStartPrice;
        dutchAuctionEndPrice = initialDutchAuctionEndPrice;
        dutchAuctionPriceDropInterval = initialDutchAuctionPriceDropInterval;

        _setDefaultRoyalty(address(this), royalty);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC2981, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setAllowListSize(uint256 newMax) public onlyOwner {
        allowListSize = newMax;
    }

    function devMint(uint256 count) public payable onlyOwner {
        _mintMany(count);
    }

    function mint(uint256 count) public payable {
        require(isSaleLive, "Nifty: sale is not currently live");

        if (auctionStartAt == 0) {
            _mintFromAllowList(count);
            return;
        }

        _mintFromAuction(count);
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
            "Nifty: cannot set max supply less than current minted supply"
        );
        maxSupply = newMaxSupply;
    }

    function setAuctionStartPrice(uint256 newPrice) public onlyOwner {
        dutchAuctionStartPrice = newPrice;
    }

    function setAuctionEndPrice(uint256 newPrice) public onlyOwner {
        dutchAuctionEndPrice = newPrice;
    }

    function setAllowListPrice(uint256 newPrice) public onlyOwner {
        allowListPrice = newPrice;
    }

    function _mintFromAllowList(uint256 count) internal {
        require(
            msg.value >= allowListPrice * count,
            "Nifty: not enough funds sent"
        );

        uint256 currentId = _tokenIds.current();

        require(
            currentId + count < allowListSize,
            "Nifty: max allow list was reached"
        );

        uint256 numAllowedMints = _allowList[_msgSender()];

        require(
            numAllowedMints >= count,
            "Nifty: sender does not have enough allow list entries"
        );

        _allowList[_msgSender()] = numAllowedMints - count;

        _mintMany(count);
    }

    function _mintFromAuction(uint256 count) internal {
        require(
            msg.value >= getAuctionPrice() * count,
            "Nifty: not enough funds sent"
        );

        _mintMany(count);
    }

    function _mint() internal {
        require(_tokenIds.current() < maxSupply, "Nifty: no Niftys left");
        address recipient = _msgSender();
        uint256 numMintedAlready = balanceOf(recipient);
        require(
            numMintedAlready < maxMintPerAddress,
            "Nifty: max mints for this address already reached"
        );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(recipient, newItemId);
    }

    function _mintMany(uint256 count) internal {
        for (uint256 i = 0; i < count; i++) {
            _mint();
        }
    }

    function setSaleLive(bool isLive) public onlyOwner {
        isSaleLive = isLive;
    }

    function setAllowListAddress(address allowLister, uint256 amount)
        public
        onlyOwner
    {
        require(
            amount < maxMintPerAddress,
            "Nifty: cannot set allowlist amount greater than maxMint per address"
        );

        _allowList[allowLister] = amount;
    }

    function setMultipleAllowListAddresses(
        address[] memory allowListers,
        uint256 amount
    ) public onlyOwner {
        require(
            amount < maxMintPerAddress,
            "Nifty: cannot set allowlist amount greater than maxMint per address"
        );

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

    function startAuction() public onlyOwner {
        auctionStartAt = block.timestamp;
    }

    function getAuctionPrice() public view returns (uint256) {
        // Auction has not started yet
        if (auctionStartAt == 0) {
            return dutchAuctionStartPrice;
        }

        // Auction is after the end
        if (block.timestamp - auctionStartAt > dutchAuctionDuration) {
            return dutchAuctionEndPrice;
        }

        // calculate price from the number intervals
        uint256 numIntervalsTotal = dutchAuctionDuration /
            dutchAuctionPriceDropInterval;

        uint256 numIntervalsElapsed = (block.timestamp - auctionStartAt) /
            dutchAuctionPriceDropInterval;

        uint256 discount = (numIntervalsElapsed *
            (dutchAuctionStartPrice - dutchAuctionEndPrice)) /
            numIntervalsTotal;

        return dutchAuctionStartPrice - discount;
    }

    function withdraw() public onlyOwner {
        (bool success, ) = _wallet.call{
            value: address(this).balance,
            gas: 10000000
        }("");

        require(success, "Nifty: withdrawl failed");
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

    function setMaxMintPerAddress(uint256 maxMint) public onlyOwner {
        maxMintPerAddress = maxMint;
    }
}
