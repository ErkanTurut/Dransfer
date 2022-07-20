// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Marketplace is ReentrancyGuard {

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        address payable artist;
        uint256 royalityFee;
        bool sold;
    }

    // itemId -> Item
    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed artist,
        uint256 royalityFee
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer,
        address artist,
        uint256 royalityFee
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price, uint _royalityFee) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        //require(_royalityFee >= 0, "RoyalityFee must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            payable(msg.sender),
            _royalityFee,
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender,
            msg.sender,
            _royalityFee
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");

        uint256 _royality = (item.price *  item.royalityFee) / 100;

        if(msg.sender != item.artist){
        //Pay artist with Royalty fee
        _payRoyalty(_itemId, _royality);
        }

        if(msg.sender != item.seller){
            // pay seller and feeAccount
            (bool success2, ) = payable(item.seller).call{value: item.price - _royality}("");
            require(success2);
        }

        //pay feePercent to FeeAccount
        _payFeeAccount(_itemId);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.safeTransferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender,
            item.artist,
            item.royalityFee
        );
    }

    function sellItem(uint _itemId) external payable nonReentrant {
        Item storage item = items[_itemId];  
        //require(item.sold, "item already sold");
        item.nft.transferFrom(msg.sender, address(this), item.tokenId);
        item.sold = false;
        item.seller = payable(msg.sender);
    }

    function _payRoyalty(uint _itemId, uint _royality) internal {
        (bool success1,) = payable(items[_itemId].artist).call{value: _royality}("");
        require(success1);
        //return(items[_itemId].price*items[_itemId].royalityFee/100);
    }

    function _payFeeAccount(uint _itemId) internal{
         uint _totalPrice = getTotalPrice(_itemId);
         (bool success3, ) = payable(feeAccount).call{value: _totalPrice - items[_itemId].price}("");
            require(success3);
    }
    
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }
}