// SPDX - License-Identifier: MINT

pragma solidity ^0.8.0;

import "./MintNailToken.sol";

contract SaleNailToken {
    MintNailToken public mintNailTokenAddress;

    constructor (address _mintNailTokenAddress){
        mintNailTokenAddress = MintNailToken(_mintNailTokenAddress);
    }

    mapping(uint256 => uint256) public nailTokenPrices;

    uint256[] public onSaleNailTokenArray;

    function setForSaleNailToken(uint256 _nailTokenId, uint256 _price) public {
        address nailTokenOwner = mintNailTokenAddress.ownerOf(_nailTokenId);

        require(nailTokenOwner == msg.sender, "Caller is not Nail token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(nailTokenPrices[_nailTokenId] == 0, "This Nail token is already on sale.");
        require(mintNailTokenAddress.isApprovedForAll(nailTokenOwner, address(this)), "Nail token owner did not approve token.");

        nailTokenPrices[_nailTokenId] = _price;

        onSaleNailTokenArray.push(_nailTokenId);
    }

    function purchaseNailToken(uint256 _nailTokenId) public payable {
        uint256 price = nailTokenPrices[_nailTokenId];
        address nailTokenOwner = mintNailTokenAddress.ownerOf(_nailTokenId);

        require(price >0, "Nail token not sale.");
        require(price <= msg.value, "Calloer sent lower than price.");
        require(nailTokenOwner != msg.sender, "Caller is Nail token owner.");

        payable(nailTokenOwner).transfer(msg.value);
        mintNailTokenAddress.safeTransferFrom(nailTokenOwner, msg.sender, _nailTokenId);

        nailTokenPrices[_nailTokenId] = 0;

        for(uint256 i = 0; i < onSaleNailTokenArray.length; i++) {
            if(nailTokenPrices[onSaleNailTokenArray[i]] == 0){
                onSaleNailTokenArray[i] = onSaleNailTokenArray[onSaleNailTokenArray.length-1];
                onSaleNailTokenArray.pop();
            }
        }
    }

    function getOnSaleNailTokenArrayLength() view public returns (uint256) {
        return onSaleNailTokenArray.length;
    }

    function getNailTokenPrice(uint256 _nailTokenId) view public returns(uint256) {
        return nailTokenPrices[_nailTokenId];
    }
}