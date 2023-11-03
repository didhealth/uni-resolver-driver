'use strict';
require('dotenv').config();
const Web3 = require('web3').Web3;


async function resolveDID(chainid, didsuffix) {
    console.log("resolver function")
    const chainInfo = getChainInfo(chainid);
    
    if (!chainInfo) {
        throw new Error(`Unknown chain ID: ${chainid}`);
    }
    console.log(process.env.ETHEREUM_NODE_ENDPOINT)
    const web3 = new Web3(process.env.ETHEREUM_NODE_ENDPOINT);
    const contractAddress = chainInfo.contractAddress;
    console.log(contractAddress)
    const CONTRACT_ABI = JSON.parse(process.env.CONTRACT_ABI);
    console.log(CONTRACT_ABI)
    const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);

    console.log("callling contract method for GetHealthDID for did:health:" + chainid+didsuffix)
    // This assumes the contract has a function called 'resolveDID' that takes a didsuffix as argument
    console.log(contract.methods)
    const didDocument = await contract.methods.getHealtDID(chainid+didsuffix).call(); //Function is named wrong
    console.log(didDocument)
    return didDocument;
}

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
//
exports.resolve = function(identifier, accept) {
  return new Promise(async function(resolve, reject) {
      try {
          console.log('resolving ' + identifier)
          const didData = parseDID(identifier);
          console.log("parsed did:health:" + didData.chainid + '----' + didData.didsuffix)
          const didDocumentRaw = await resolveDID(didData.chainid, didData.didsuffix);
          console.log('converting to json')
          const diddocument = convertToDidDocument(didDocumentRaw);
          console.log(diddocument)
          const found = diddocument//[identifier];
          
          if (found) {
              resolve(found);
          } else {
              resolve(404);  // Consider changing this to a more descriptive error or rejection
          }
      } catch (error) {
          reject(error);  // You might want to handle specific error types or messages here
      }
  });
}

function parseDID(did) {
  console.log("parsing did" + did)
  const parts = did.split(":");
  const combined = parts[2];
  console.log(combined)
  const chainid = combined.slice(0, 6);
  const didsuffix = combined.slice(6);
  return { chainid, didsuffix };
}
//https://blockscan.com/address/0xed0408da197f5f5fc306ca4b3148149d64e0514f

function getChainInfo(chainid) {

const chainMap = {
  "000001": {
      network: "mainnet",
      contractAddress: "0x1234abcd..."
  },
  "000005": {
      network: "goerli",
      contractAddress: "0xed0408DA197f5F5Fc306ca4B3148149D64e0514F",
  },
  "080001": {
    network: "polygon mumbai",
    contractAddress: "0xed0408DA197f5F5Fc306ca4B3148149D64e0514F"
  },
  "084531" : {
    network: "base goerli",
    contractAddress: "0xed0408DA197f5F5Fc306ca4B3148149D64e0514F"
  },
  "000420"  : {
    network: "optimism goerli",
    contractAddress: "0xed0408DA197f5F5Fc306ca4B3148149D64e0514F"
  },
  "421611" : {
    network: "arbitrum rinkeby",
    contractAddress: "0xed0408DA197f5F5Fc306ca4B3148149D64e0514F"
  },
  "421613" : {
    network: "arbitrum goerli",
    contractAddress: "0xed0408DA197f5F5Fc306ca4B3148149D64e0514F"
  },
  "059140": {
    network: "linea testnet",
    contractAddress: "0xed0408DA197f5F5Fc306ca4B3148149D64e0514F"
  },

};
  console.log(chainid)
  console.log(chainMap[chainid])
  return chainMap[chainid];
}

function convertToDidDocument (resolvedDid){
  
  if (!resolvedDid || !resolvedDid.healthDid) return null;

  return {
    "@context": "https://www.w3.org/ns/did/v1",
    "id": `did:health:${resolvedDid.healthDid}`,
    "verificationMethod": [
      {
        "id": `did:health:${resolvedDid.healthDid}#keys-1`,
        "type": "EcdsaSecp256k1RecoveryMethod2020",
        "controller": `did:health:${resolvedDid.healthDid}`,
        "publicKeyBase58": resolvedDid.owner,
        "threshold": {
          "n": 5,
          "t": 3
        }
      }
    ],
    "authentication": [
      `did:health:${resolvedDid.healthDid}#keys-1`
    ],
    "assertionMethod": [
      `did:health:${resolvedDid.healthDid}#keys-1`
    ],
    "capabilityInvocation": [
      `did:health:${resolvedDid.healthDid}#keys-1`
    ],
    "capabilityDelegation": [
      `did:health:${resolvedDid.healthDid}#keys-1`
    ],
    "keyAgreement": [
      {
        "id": `did:health:${resolvedDid.healthDid}#keys-2`,
        "type": "EcdsaSecp256k1RecoveryMethod2020",
        "controller": `did:health:${resolvedDid.healthDid}`,
        "publicKeyBase58": resolvedDid.owner,
        "threshold": {
          "n": 5,
          "t": 3
        }
      }
    ],
    "service": [
      {
        "id": `did:health:${resolvedDid.healthDid}#patient`,
        "type": "Patient", // Assuming this is the type
        "serviceEndpoint": resolvedDid.ipfsUri,
        "description": "Access to the Pateint Demographics secured by LIT Protocol and stored on IPFS."
      }
    ]
  };

};


