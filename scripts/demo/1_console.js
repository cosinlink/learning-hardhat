const log = console.log.bind(console)
const { deployContract } = require('../utils/util')
const {ethers} = require('hardhat')

const main = async () => {
    const unit = ethers.constants.WeiPerEther
    const contract = await deployContract('ConsoleDemo')
    const tx = await contract.increase()
    await tx.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
