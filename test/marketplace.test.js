const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("TKTS Marketplace", function () {
  let deployer, addr1, addr2, nft, marketplace;
  let feePercent = 10;
  let URI = "https://ipfs.io/ipfs/test";
  let URI2 = "https://ipfs.io/ipfs/test2";
  let URI3 = "https://ipfs.io/ipfs/test3";

  beforeEach(async function () {
    //get contract factories
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    //get signers
    [deployer, addr1, addr2] = await ethers.getSigners();

    //Deploy contracts with 10% for marketplace fee
    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });

  describe("Deployement", function () {
    it("should track name and symbol of the nft collection", async function () {
      expect(await nft.name()).to.equal("Tickets");
      expect(await nft.symbol()).to.equal("TKTS");
    });

    it("should track fee Account and fee Percent of the marketplace", async function () {
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    });
  });

  describe("Minting NFT", function () {
    it("Should track each mintend NFTs", async function () {
      //addr1 mint an NFT
      await nft.connect(addr1).mint(URI);
      expect(await nft.tokenCount()).to.equal(1);
      expect(await nft.balanceOf(addr1.address)).to.equal(1);
      expect(await nft.tokenURI(1)).to.equal(URI);
      //addr2 mint an NFT
      await nft.connect(addr2).mint(URI2);
      expect(await nft.tokenCount()).to.equal(2);
      expect(await nft.balanceOf(addr2.address)).to.equal(1);
      expect(await nft.tokenURI(2)).to.equal(URI2);
      //addr2 mint an NFT for the second time
      await nft.connect(addr2).mint(URI3);
      expect(await nft.tokenCount()).to.equal(3);
      expect(await nft.balanceOf(addr2.address)).to.equal(2);
      expect(await nft.tokenURI(3)).to.equal(URI3);
    });
  });

  describe("Making marketplace items", function () {
    let price = 1;
    let royalityFee = 10;
    let result;
    beforeEach(async function () {
      //addr 1 mint and nft
      await nft.connect(addr1).mint(URI);
      //addr1 approves marketplace to spend NFT
      await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
    });
    it("Should track newly created item, transfer NFT from seller and emit offered event", async function () {
      await expect(
        marketplace
          .connect(addr1)
          .makeItem(nft.address, 1, toWei(price), royalityFee)
      )
        .to.emit(marketplace, "Offered")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(price),
          addr1.address,
          addr1.address,
          royalityFee
        );

      //Owner of NFT should now be the marketplace
      expect(await nft.ownerOf(1)).to.equal(marketplace.address);
      //Item count should now equal 1
      expect(await marketplace.itemCount()).to.equal(1);
      //get item from items mapping then check fields to ensure they are correct
      const item = await marketplace.items(1);
      expect(item.itemId).to.equal(1);
      expect(item.nft).to.equal(nft.address);
      expect(item.tokenId).to.equal(1);
      expect(item.price).to.equal(toWei(price));
      expect(item.seller).to.equal(addr1.address);
      expect(item.artist).to.equal(addr1.address);
      expect(item.royalityFee).to.equal(royalityFee);
      expect(item.sold).to.equal(false);
    });

    it("it should fail if price is set zero or less", async function () {
      await expect(
        marketplace
          .connect(addr1)
          .makeItem(nft.address, 1, toWei(0), royalityFee)
      ).to.be.revertedWith("Price must be greater than zero");
    });
  });

  describe("Purchasing marketplace items", async function () {
    let price = 1;
    let totalPriceInWei;
    let royalityFee = 10;

    beforeEach(async function () {
      //addr1 mints an nft
      await nft.connect(addr1).mint(URI);
      //addr1 approves marketplace to spend nft
      await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
      //addr1 makes their nft a marketplace item
      await marketplace
        .connect(addr1)
        .makeItem(nft.address, 1, toWei(price), royalityFee);
    });

    it("should uptade item as sold, pay seller, pay royaltees to the artist, market get feePercent and emit a bought event", async function () {
      const sellerInitialEthBal = await addr1.getBalance();
      const feeAccountInitialEthBal = await deployer.getBalance();
      //fetch item total price (market fees + item price)
      totalPriceInWei = await marketplace.getTotalPrice(1);
      //addr 2 purchase item
      await expect(
        marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })
      )
        .to.emit(marketplace, "Bought")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(price),
          addr1.address,
          addr2.address,
          addr1.address,
          royalityFee
        );

      const sellerFinalEthBal = await addr1.getBalance();
      const feeAccountFinalEthBal = await deployer.getBalance();

      //seller should receive de payement for the price of the NFT

      expect(+fromWei(sellerFinalEthBal)).to.equal(
        +price + +fromWei(sellerInitialEthBal)
      );

      console.log();

      //calculate the fee price
      const fee = (feePercent / 100) * price;

      //feeAccount should receive de fee of the buyer's payement
      expect(+fromWei(feeAccountFinalEthBal)).to.equal(
        +fee + +fromWei(feeAccountInitialEthBal)
      );
      //the buyer should own the NFT
      expect(await nft.ownerOf(1)).to.equal(addr2.address);
      //item should be marked as sold
      expect((await marketplace.items(1)).sold).to.equal(true);
    });
  });
});
