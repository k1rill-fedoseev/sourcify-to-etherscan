const fetch = require('node-fetch')
const querystring = require('querystring')
const axios = require('axios')

const delay = (ms) => new Promise(res => setTimeout(res, ms))

async function main() {
  const apiUrl = 'https://api-rinkeby.etherscan.io/api'
  const address = '0x94263a20b1Eea751d6C3B207A7A0ba8fF8Db9E90'
  const res = await fetch(`https://sourcify.dev/server/files/4/${address}`)
  const files = await res.json()

  const metadata = JSON.parse(files.find(file => file.name === 'metadata.json').content)
  const sources = files.filter(file => file.name !== 'metadata.json' && file.name !== 'constructor-args.txt')
  const version = `v${metadata.compiler.version}`
  console.log(version)
  const target = Object.entries(metadata.settings.compilationTarget)[0].join(':')
  console.log(target)
  console.log(metadata.settings)
  console.log(sources.length)

  const standardJson = {
    language: metadata.language,
    sources: {},
    settings: {
      optimizer: metadata.settings.optimizer,
      evmVersion: metadata.settings.evmVersion,
      remappings: metadata.settings.remappings,
      libraries: metadata.settings.libraries
    }
  }
  const prefix = '/home/data/repository/contracts/full_match/4/0x94263a20b1Eea751d6C3B207A7A0ba8fF8Db9E90/sources/'
  for (const file of sources) {
    file.path = file.path.replace('sources/_', 'sources/@')
    console.log(file.path)
    standardJson.sources[file.path.slice(prefix.length)] = {
      content: file.content
    }
  }
  // console.log(sources)
  console.log(standardJson)

  const args = '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010666f7220566572696669636174696f6e00000000000000000000000000000000'
  const apikey = 'MWBWHZH2CGU1KM4C28BH55IJHN439G41XQ'
  const body = {
    apikey,
    module: 'contract',
    action: 'verifysourcecode',
    contractaddress: address,
    sourceCode: JSON.stringify(standardJson),
    codeformat: 'solidity-standard-json-input',
    contractname: target,
    compilerversion: version,
    constructorArguements: ''
  }
  const str = querystring.stringify(body)
  const result = await fetch(apiUrl, {
    method: 'POST',
    body: str,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
  }).then(res => res.json())
  console.log(result)



  const guid = result.result
  while (true) {
    await delay(5000)

    try {
      const qs = querystring.stringify({
        apiKey: apikey,
        module: 'contract',
        action: 'checkverifystatus',
        guid
      })
      const verificationResult = await fetch(`${apiUrl}?${qs}`).then(res => res.json())
      if (verificationResult.result !== VerificationStatus.PENDING) {
        console.log(verificationResult)
      }
    } catch (error) {
      console.log(error)
      throw new Error(`Failed to connect to Etherscan API at url ${apiUrl}`)
    }
  }
}

main()
