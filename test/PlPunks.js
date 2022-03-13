const { expect } = require("chai"); //chai -herramienta de testing
//llamamos una funcion para probar nuestro contrato
//test para la cantidad maxima del contrato

describe("Platzi Punks Contract", () => {
  const setup = async ({ maxSupply = 10000 }) => {
    const [owner] = await ethers.getSigners();
    const PlatziPunks = await ethers.getContractFactory("plPunks");
    const deployed = await PlatziPunks.deploy(maxSupply);

    return {
      owner,
      deployed,
    };
  };
//llamada asincrona del contrato en solidity
  describe("Deployment", () => {
    it("Sets max supply to passed param", async () => {
      const maxSupply = 4000;

      const { deployed } = await setup({ maxSupply });

      const returnedMaxSupply = await deployed.maxSupply();
      expect(maxSupply).to.equal(returnedMaxSupply);
    });
  });
//this test is failing
//AssertionError: Transaction is not being reverted.
  describe("Minting", () => {
    it("Mints a new token and assigns it to owner", async () => {
      const { owner, deployed } = await setup({});

      await deployed.mint();

      const ownerOfMinted = await deployed.ownerOf(0);

      expect(ownerOfMinted).to.equal(owner.address);
    });

    it("Has a minting limit", async () => {
      const maxSupply = 2;

      const { deployed } = await setup({ maxSupply });

      //mint all
      await Promise.all([deployed.mint(), deployed.mint()]);
//assert the last minting
      await expect(deployed.mint()).to.be.revertedWith(
        "No Tokens left"
      );
    });
  });
//syntaxError:Unexpected token h in JSON at position 67??
//Find out what this means.
    describe("tokenURI", () => {
      it("returns valid metadata", async () => {
        const { deployed } = await setup({});

        await deployed.mint();

        const tokenURI = await deployed.tokenURI(0);
        const stringifiedTokenURI = await tokenURI.toString();
        const [, base64JSON] = stringifiedTokenURI.split(
          "data:application/json;base64,"
        );
        const stringifiedMetadata =  Buffer.from(
          base64JSON,
          "base64"
        ).toString("ascii");

        const metadata = JSON.parse(stringifiedMetadata);

        expect(metadata).to.have.all.keys("name", "description", "image");
      });
    });
});