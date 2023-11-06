![DIF Logo](https://raw.githubusercontent.com/decentralized-identity/universal-resolver/master/docs/logo-dif.png)

# Universal Resolver Driver: did:health

This is an the [Universal Resolver](https://github.com/decentralized-identity/universal-resolver/) driver for **did:health** identifiers.  did:health identifiers allow users to link their service endpoints for FHIR Resources that relate to the person's healthcare or provision thereof.

## Specifications

* [Decentralized Identifiers](https://w3c.github.io/did-core/)

## Example DIDs

```
did:health:000005rreere8
did:health:000005saasas1234
```

## Build and Run (Docker)

```
docker build -f ./docker/Dockerfile . -t didhealth/uni-resolver-driver-did-health
docker run -p 8080:8080 didhealth/uni-resolver-driver-did-health
curl -X GET [http://localhost:8080/1.0/identifiers/did:health:0000000000123456](http://localhost:8080/1.0/identifiers/did:health:000005rreere8)
```

## Build and Run (NodeJS)

```
npm start
```

## Driver Environment Variables

The driver recognizes the following environment variables:

ETHEREUM_NODE_ENDPOINT=https://goerli.infura.io/v3/YOURAPIKEY
CONTRACT_ABI=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_healthDid","type":"string"},{"internalType":"string[]","name":"_uris","type":"string[]"}],"name":"addAltData","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_peerAddress","type":"address"},{"internalType":"string","name":"_healthDid","type":"string"}],"name":"addDelegateAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressDidMapping","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"healthDid","type":"string"},{"internalType":"string","name":"ipfsUri","type":"string"},{"internalType":"uint8","name":"reputationScore","type":"uint8"},{"internalType":"bool","name":"hasWorldId","type":"bool"},{"internalType":"bool","name":"hasPolygonId","type":"bool"},{"internalType":"bool","name":"hasSocialId","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"name":"delegateAddresses","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChainID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_healthDid","type":"string"}],"name":"getHealtDID","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address[]","name":"delegateAddresses","type":"address[]"},{"internalType":"string","name":"healthDid","type":"string"},{"internalType":"string","name":"ipfsUri","type":"string"},{"internalType":"string[]","name":"altIpfsUris","type":"string[]"},{"internalType":"uint8","name":"reputationScore","type":"uint8"},{"internalType":"bool","name":"hasWorldId","type":"bool"},{"internalType":"bool","name":"hasPolygonId","type":"bool"},{"internalType":"bool","name":"hasSocialId","type":"bool"}],"internalType":"struct Structs.HealthDID","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_healthDID","type":"string"},{"internalType":"string","name":"_uri","type":"string"}],"name":"registerDID","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_peerAddress","type":"address"},{"internalType":"string","name":"_healthDid","type":"string"}],"name":"removeDelegateAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"did","type":"string"}],"name":"resolveChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"string","name":"_source","type":"string"}],"name":"stringToBytes32","outputs":[{"internalType":"bytes32","name":"_result","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"},{"internalType":"string","name":"_healthDid","type":"string"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_healthDid","type":"string"},{"internalType":"string","name":"_uri","type":"string"}],"name":"updateDIDData","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
