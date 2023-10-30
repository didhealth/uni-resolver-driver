'use strict';
const Web3 = require('web3');
const web3 = new Web3('<YOUR_ETHEREUM_NODE_ENDPOINT>');

const CONTRACT_ABI = [/* Your contract ABI here */];

async function resolveDID(chainid, didsuffix) {
    const chainInfo = getChainInfo(chainid);
    
    if (!chainInfo) {
        throw new Error(`Unknown chain ID: ${chainid}`);
    }
    
    const contractAddress = chainInfo.contractAddress;
    const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);
    
    // This assumes the contract has a function called 'resolveDID' that takes a didsuffix as argument
    const didDocument = await contract.methods.resolveDID(didsuffix).call();
    
    return didDocument;
}

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
exports.resolve = function(identifier,accept) {
  return new Promise(function(resolve, reject) {
    let didDocument
    didDocument = resolveDID(parseDID(identifier))
    var diddocument = convertToDidDocument(didDocument );
    
    var found = diddocument[identifier];
    if (found) {
      resolve(found);
    } else {
      resolve(404);
    }
  });
}

function parseDID(did) {
  const parts = did.split(":");
  const combined = parts[2];
  const chainid = combined.slice(0, -4);
  const didsuffix = combined.slice(-4);  
  return { chainid, didsuffix };
}

const chainMap = {
  "0001": {
      network: "mainnet",
      contractAddress: "0x1234abcd..."
  },
  "0002": {
      network: "rinkeby",
      contractAddress: "0x5678efgh..."
  }
  // ... add other chain IDs as necessary
};

function getChainInfo(chainid) {
  return chainMap[chainid];
}


export function convertToDidDocument (resolvedDid){
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


