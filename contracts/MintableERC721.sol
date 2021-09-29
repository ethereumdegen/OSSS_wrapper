// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 

// Libraries
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

contract MintableERC721 is ERC721 {
    constructor() ERC721("NFT", "NFT") { }

    function mint(uint256 tokenId) public {
        _mint(msg.sender, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://example.com/token/721/metadata/";
    }
} 