
const deploy = async () => {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:",deployer.address);
    const PlPunks = await ethers.getContractFactory("plPunks");
    const deployed = await PlPunks.deploy(10000);
    console.log("PlPunks is deployed at:",deployed.address);
}

deploy()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});

//realizar deploy hacia rinkeby