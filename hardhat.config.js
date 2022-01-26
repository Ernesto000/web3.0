require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const projectId = process.env.INFURA_PROJECT_ID;
const privateKey = process.env.DEPLOYER_SIGNER_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url:"https://rinkeby.infura.io/v3/d2eeb163505c4ac58571b26dba3ed0bb",
      accounts: [privateKey],
    },
  }
};
