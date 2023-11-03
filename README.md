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
docker build -f ./docker/Dockerfile . -t exampleorg/uni-resolver-driver-did-example
docker run -p 8080:8080 exampleorg/uni-resolver-driver-did-example
curl -X GET http://localhost:8080/1.0/identifiers/did:example:0000000000123456
```

## Build and Run (NodeJS)

```
npm start
```

## Driver Environment Variables

The driver recognizes the following environment variables:

### `uniresolver_driver_did_example_exampleSetting`

 * An example setting for the driver.
 * Default value: (empty string)

## Driver Metadata

The driver returns the following metadata in addition to a DID document:

* `exampleMetadata`: Example metadata
