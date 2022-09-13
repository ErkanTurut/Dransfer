const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("DransferStorage", function () {
  let deployer, addr1, addr2;

  beforeEach(async function () {
    this.Dransfer = await ethers.getContractFactory("DransferStorage");

    [deployer, addr1, addr2] = await ethers.getSigners();

    this.dransfer = await this.Dransfer.deploy(2);
    await this.dransfer.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await this.dransfer.owner()).to.equal(deployer.address);
    });
    it("should right fee", async function () {
      expect(await this.dransfer.fee()).to.equal(2);
    });
  });

  describe("Store File", function () {
    it("Should store file", async function () {
      await this.dransfer
        .connect(addr1)
        .store("QmaDGr6dyABNcszebbciAoQyMFAZTDm5cuyxKN9dzEAeHx");
      await this.dransfer
        .connect(addr1)
        .store("Qmce5zZfA17P2U71UYTbmdjkYcec19DHJnctiqmKs8sZ35");
      expect(
        await this.dransfer.UserDirectoriesIndex(addr1.address, 0)
      ).to.equal(0);
      expect(
        await this.dransfer.UserDirectoriesIndex(addr1.address, 1)
      ).to.equal(1);

      expect(
        await this.dransfer
          .connect(addr1)
          .getUserDirectory(0)
          .then((res) => {
            return res.hash;
          })
      ).to.equal("QmaDGr6dyABNcszebbciAoQyMFAZTDm5cuyxKN9dzEAeHx");
      expect(
        await this.dransfer
          .connect(addr1)
          .getUserDirectory(1)
          .then((res) => {
            return res.hash;
          })
      ).to.equal("Qmce5zZfA17P2U71UYTbmdjkYcec19DHJnctiqmKs8sZ35");
      expect(
        await this.dransfer
          .connect(addr1)
          .getAllFiles()
          .then((res) => {
            return res[0].hash;
          })
      ).to.equal("QmaDGr6dyABNcszebbciAoQyMFAZTDm5cuyxKN9dzEAeHx");
    });
  });
});
