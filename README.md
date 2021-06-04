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
sourcify-to-etherscan/0.0.1 darwin-x64 node-v10.22.1
$ sourcify-to-etherscan --help [COMMAND]
USAGE
  $ sourcify-to-etherscan COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sourcify-to-etherscan hello [FILE]`](#sourcify-to-etherscan-hello-file)
* [`sourcify-to-etherscan help [COMMAND]`](#sourcify-to-etherscan-help-command)

## `sourcify-to-etherscan hello [FILE]`

describe the command here

```
USAGE
  $ sourcify-to-etherscan hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ sourcify-to-etherscan hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/k1rill-fedoseev/sourcify-to-etherscan/blob/v0.0.1/src/commands/hello.ts)_

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
<!-- commandsstop -->
