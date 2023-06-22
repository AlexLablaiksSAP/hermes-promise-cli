# Hermes Promise Testing

Primarily used to demonstrate the performance of Hermes vs other JavaScript engines, such as Chakra.

## Description

There are observable differences between the various JavaScript engines (Hermes, Chakra, etc.) when a large amount of promises are processed. This was originally tracked against [microsoft/hermes-windows issue #92](https://github.com/microsoft/hermes-windows/issues/92).

An application may want to format / sanitize individual fields on data returned from a back-end; such as a Date Time format, capitalization, etc. Likely, this would be done with asynchronous or promise based functions running. This example project seeks to demonstrate that behavior for large data sets of 1,000 and 10,000.

## Getting Started

### Prerequisites

* Have at least one command line executable JavaScript engine ready to invoke against the project output (see below).
* Make sure [Node](https://nodejs.org/en) is installed and configured.
* Invoke `npx install` or `yarn install`.

## Building
1. `npx compile` or `yarn compile` to produce a Hermes digestible bundle: `dist/index.bundle.js`. 

## Usage
Simply pass the path of `dist/index.bundle.js` into any JavaScript engine of your choice, then the `main()` function will run any scenarios inside of it. Feel free to modify `main()` to expand or shrink sample sizes and any additional custom tests. The tests report times using `console.log()`, so you may need to polyfill this for engines which don't support this. Note that an entry has already been made to map to Hermes' `print()` function.

### Testing Examples & Hints

#### Hermes
Releases are available under [releases of facebook/hermes](https://github.com/facebook/hermes/releases). As a convenience, there is a git ignore entry for the `build` directory in this repository. A User may unzip the contents of something like `hermes-engine-cli-v0.12.0.tgz` into this directory and then invoke the tests with ` ./build/hermes-engine-cli-v0.12.0/package/win64-bin/hermes ./dist/index.bundle.js`, as an example.

#### Chakra
Release binaries for Non-windows are available at [Getting ChakraCore binaries](https://github.com/chakra-core/ChakraCore/wiki/Getting-ChakraCore-binaries). For Windows, it is recommended to build the binaries with [Building ChakraCore](https://github.com/chakra-core/ChakraCore#building-chakracore). Similarly to Hermes, either copy the executable and shared libraries into the `build` directory or use the full path to the built binaries during invocation.
