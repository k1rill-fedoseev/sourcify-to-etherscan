import {Command, flags} from '@oclif/command'
import {Network, NETWORKS, VerificationStatus} from '../constants'
import * as sourcify from '../sourcify'
import * as etherscan from '../etherscan'
import {makeStandardJson} from '../utils'

export default class Verify extends Command {
  static description = 'check contract verification status in Sourcify and Etherscan'

  static examples = [
    '$ sourcify-to-etherscan verify --apikey <...> --network rinkeby 0x94263a20b1Eea751d6C3B207A7A0ba8fF8Db9E90',
    '$ sourcify-to-etherscan verify -k <...> -n 4 -a <...> 0x94263a20b1Eea751d6C3B207A7A0ba8fF8Db9E90',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    network: flags.enum({
      char: 'n',
      description: 'network name or chain id to use',
      options: [...NETWORKS.map(n => n.name), ...NETWORKS.map(n => n.chainId.toString())],
      default: 'mainnet',
    }),
    args: flags.string({char: 'a', description: 'abi-encoded constructor arguments'}),
    apikey: flags.string({char: 'k', description: 'etherscan api key', env: 'ETHERSCAN_API_KEY'}),
  }

  static args = [{name: 'contract', required: true}]

  async run() {
    const {args, flags} = this.parse(Verify)

    const network: Network = NETWORKS.find(n => n.name === flags.network || n.chainId.toString() === flags.network)!

    this.log('Checking verification status on Sourcify')

    const status = await sourcify.check(network.chainId, args.contract)

    if (status !== 'perfect') {
      this.error(`contract ${args.contract} is not yet verified on Sourcify for ${network.name}`)
    }

    this.log('Fetching source code and metadata files from Sourcify')

    const files = await sourcify.files(network.chainId, args.contract)

    this.log('Parsing source files')

    const {target, version, metadata, sources, constructorArgs} = sourcify.parseFiles(files)

    this.log('Constructing standard JSON input from obtained source files')

    const standardJson = makeStandardJson(metadata, sources)

    this.log('Submitting standard JSON to etherscan')

    const guid = await etherscan.verify({
      api: network.etherscanApiURL,
      apiKey: flags.apikey,
      contract: args.contract,
      source: standardJson,
      target,
      version,
      args: flags.args || constructorArgs,
    })

    if (guid === VerificationStatus.ALREADY_VERIFIED) {
      this.log('Contract is already verified on Etherscan')
      return
    }

    this.log(`Waiting for the verification job ${guid} to complete`)

    const result = await etherscan.waitFor(network.etherscanApiURL, flags.apikey, guid)

    if (result === VerificationStatus.SUCCESS) {
      this.log('Successfully verified contract on Etherscan :)')
    } else {
      this.error('Failed to verify :(')
    }
  }
}
