// SPDX-License-Identifier: MINT

pragma solidity ^0.8.0;

import "./node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "SaleNailToken.sol";

contract MintNailToken is ERC721Enumerable {
    constructor() ERC721("name", "symbol") {}

    SaleNailToken public saleNailToken;

    mapping(uint256 => uint256) public nailTypes;
    //
    mapping(uint256 => string) public nailHealthDatas;

    struct NailTokenData {
        uint256 nailTokenId;
        uint256 nailType;
        uint256 nailPrice;
        //
        string nailHealthData;
    }

    function mintNailToken(string memory data) public {
        uint256 nailTokenId = totalSupply() +1;

        uint256 nailType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nailTokenId))) %5+1;

        nailTypes[nailTokenId] = nailType;

        //
        string memory nailHealthData = data;
        nailHealthDatas[nailTokenId] = nailHealthData;

        _mint(msg.sender, nailTokenId);
    }

    function getNailTokens(address _nailTokenOwner) view public returns (NailTokenData[] memory) {
        uint256 balanceLength = balanceOf(_nailTokenOwner);

        require (balanceLength != 0, "Owner did not have token!");

        NailTokenData[] memory nailTokenData = new NailTokenData[](balanceLength);

        for (uint256 i = 0; i <balanceLength; i++){
            uint256 nailTokenId = tokenOfOwnerByIndex(_nailTokenOwner, i);
            uint256 nailType = nailTypes[nailTokenId];
            uint256 nailPrice = saleNailToken.getNailTokenPrice(nailTokenId);
            //
            string memory nailHealthData = nailHealthDatas[nailTokenId];

            nailTokenData[i] = NailTokenData(nailTokenId, nailType, nailPrice, nailHealthData);
        }

        return nailTokenData;
    }

    function setSaleNailToken(address _saleNailToken) public {
        saleNailToken = SaleNailToken(_saleNailToken);
    }

}