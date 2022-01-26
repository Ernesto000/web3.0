
const deploy = async () => {
    const [deployer] =await ethers.getSigners();
    console.log("Deploying contract with the account:",deployer.address);
    const plPunks = await ethers.getContractFactory("plPunks");
    const deployed = await plPunks.deploy();
    console.log("PlPunks is deployed at:",deployed.address);
}

deploy()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});