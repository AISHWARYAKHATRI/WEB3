const { ethers } = require("ethers");

// basic connection to metamask
async function connect() {
    if(typeof window.ethereum != undefined ) {
        console.log('We see metamask')
        await ethereum.request({ method: 'eth_requestAccounts'});
    }
}
// to be able to send transaction and for that we have ether.js and web3.js
async function execute() {
    // to execute a function, you need address, contract ABI(blueprint to interact with a contract and you need this to call functions), function, node connection(we have it i.e metamask)
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    const abi = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_favoriteNumber",
              "type": "uint256"
            }
          ],
          "name": "addPerson",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "nameToFavoriteNumber",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "people",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "favoriteNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "retrieve",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_favoriteNumber",
              "type": "uint256"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
    ]
    // stick out provider metamask to ethers. Metamask is gonna be our provider
    const provider = new ethers.providers.web3Provider(window.ethereum)
    // any time somebody executes a transaction, somebody needs to execute it, somebody needs to sign it
    // this is gonna get the connected account
    const signer = provider.signer() 
    // And now we put those all together into what is called a contract in ethers
    // what are we saying is we are gonna be interacting with this contract address using this abi and any function call is going to be called by the signer. So whoever connects here is gonna be the signer. So the one whos gonna be connected is the one whos gonna call this transactions
    const contract = new ethers.Contract(contractAddress, abi, signer)
    // call the smart contract method
    await contract.store(42)
}

module.exports = {
    connect,
    execute,
};