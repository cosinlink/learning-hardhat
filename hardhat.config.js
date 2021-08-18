require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-truffle4");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config()
const fs = require('fs');
const TOML = require('@iarna/toml');

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(await account.getAddress());
    }
});

module.exports = {
    // This is a sample solc configuration that specifies which version of solc to use
    solidity: {
        compilers: [
            {
                version: "0.5.10",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200
                    }
                }
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            },
            {
                version: "0.7.4",
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200
                    }
                }
            },
            {
                version: "0.8.0",
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200
                    }
                }
            },
            {
                version: "0.8.2",
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200
                    }
                }
            }
        ]
    },

    defaultNetwork: "hardhat",

    networks: {
        hardhat: {},
        ropsten: {
            url: `${process.env.ROPSTEN_API ? process.env.ROPSTEN_API : "https://ropsten.infura.io/v3/48be8feb3f9c46c397ceae02a0dbc7ae"}`,
            accounts: [`${process.env.ROPSTEN_DEPLOYER_PRIVATE_KEY ? process.env.ROPSTEN_DEPLOYER_PRIVATE_KEY : "0x49740e7b29259e7c2b693f365a9fd581cef75d1e346c8dff89ec037cdfd9f89d"}`]
        },
        kovan: {
            url: `${process.env.KOVAN_API ? process.env.KOVAN_API : "https://kovan.infura.io/v3/3ed3eadf912c4b31b800aafeedbf79eb"}`,
            accounts: [`${process.env.KOVAN_DEPLOYER_PRIVATE_KEY ? process.env.KOVAN_DEPLOYER_PRIVATE_KEY : "0xc4ad657963930fbff2e9de3404b30a4e21432c89952ed430b56bf802945ed37a"}`]
        },
        geth: {
            url: `http://127.0.0.1:8545`,
            // address [`0x17c4b5CE0605F63732bfd175feCe7aC6b4620FD2`, `0x46beaC96B726a51C5703f99eC787ce12793Dae11`]
            // Mnemonic [`dignity vehicle fuel siren cool machine video spice oppose olympic polar discover`, ``]
            accounts: [
                `0x800e7f9e3cf1b218d0d5ad1717c44ddb374b621950cf2eea14f0f54ef06e87c7`,
                `0xb4047959ba3d4f69484d88ac99b79397431bc33e13d642c52d8b85fa52ebb512`
            ],
        },
        benchmark: {
            url: `http://127.0.0.1:8545`,
            accounts: [
                `0x800e7f9e3cf1b218d0d5ad1717c44ddb374b621950cf2eea14f0f54ef06e87c7`,
                `0xb4047959ba3d4f69484d88ac99b79397431bc33e13d642c52d8b85fa52ebb512`,
            ],
        },
        ganache: {
            url: `http://127.0.0.1:8545`,
            accounts: [
                `0x800e7f9e3cf1b218d0d5ad1717c44ddb374b621950cf2eea14f0f54ef06e87c7`,
                `0xb4047959ba3d4f69484d88ac99b79397431bc33e13d642c52d8b85fa52ebb512`,
                `0x26be9e29b99eda01d37233f5898da1fced2a5c3da3fc3c595207e38020f86e7e`,
                `0xc6221a0340ed46d8e9888c15bb32561b21f73164484dc8bc5766a51078545ce8`,
                `0x9330541c3b04213715cebc0308175c71227a914a4325562b5b01f25bb94bf021`,
            ],
        }
    },

    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    }
};
