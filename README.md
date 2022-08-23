sourcify-to-etherscan
=====================

CLI for importing Sourcify verified contract to Etherscan in the simplest and fastest way

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sourcify-to-etherscan.svg)](https://npmjs.org/package/sourcify-to-etherscan)
[![Downloads/week](https://img.shields.io/npm/dw/sourcify-to-etherscan.svg)](https://npmjs.org/package/sourcify-to-etherscan)
[![License](https://img.shields.io/npm/l/sourcify-to-etherscan.svg)](https://github.com/k1rill-fedoseev/sourcify-to-etherscan/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sourcify-to-etherscan
$ sourcify-to-etherscan COMMAND
running command...
$ sourcify-to-etherscan (-v|--version|version)
sourcify-to-etherscan/0.0.3 darwin-arm64 node-v16.15.0
$ sourcify-to-etherscan --help [COMMAND]
USAGE
  $ sourcify-to-etherscan COMMAND
...
```
<!-- usagestop -->

### Docker

```bash
$ docker run kirillfedoseev/sourcify-to-etherscan:latest COMMAND
```

# Commands
<!-- commands -->
* [`sourcify-to-etherscan help [COMMAND]`](#sourcify-to-etherscan-help-command)
* [`sourcify-to-etherscan verify CONTRACT`](#sourcify-to-etherscan-verify-contract)

## `sourcify-to-etherscan help [COMMAND]`

display help for sourcify-to-etherscan

```
USAGE
  $ sourcify-to-etherscan help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `sourcify-to-etherscan verify CONTRACT`

check contract verification status in Sourcify and Etherscan

```
USAGE
  $ sourcify-to-etherscan verify CONTRACT

OPTIONS
  -a, --args=args
      abi-encoded constructor arguments

  -h, --help
      show CLI help

  -k, --apikey=apikey
      etherscan api key

  -n, 
  --network=(mainnet|ropsten|rinkeby|goerli|kovan|bsc|bsc_testnet|gnosis|arbitrum|arbitrum_rinkbedy|avalanche|avalanche_fuji|1|
  3|4|5|42|56|97|100|42161|421611|43114|43113)
      [default: mainnet] network name or chain id to use

EXAMPLES
  $ sourcify-to-etherscan verify --apikey <...> --network rinkeby 0x94263a20b1Eea751d6C3B207A7A0ba8fF8Db9E90
  $ sourcify-to-etherscan verify -k <...> -n 4 -a <...> 0x94263a20b1Eea751d6C3B207A7A0ba8fF8Db9E90
```

_See code: [src/commands/verify.ts](https://github.com/k1rill-fedoseev/sourcify-to-etherscan/blob/v0.0.3/src/commands/verify.ts)_
<!-- commandsstop -->
