import axios from 'axios'
import {VerificationStatus} from './constants'
import {delay} from './utils'

type VerifyParams = {
  api: string; apiKey: string | undefined; contract: string; source: any; target: string; version: string; args: string;
}
export async function verify({api, apiKey, contract, source, target, version, args}: VerifyParams): Promise<string> {
  const params = new URLSearchParams()
  if (apiKey) {
    params.append('apikey', apiKey)
  }
  params.append('module', 'contract')
  params.append('action', 'verifysourcecode')
  params.append('contractaddress', contract)
  params.append('sourceCode', JSON.stringify(source))
  params.append('codeformat', 'solidity-standard-json-input')
  params.append('contractname', target)
  params.append('compilerversion', version)
  params.append('constructorArguements', args)

  const {data} = await axios.post(api, params, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
  })

  return data.result
}

export async function waitFor(api: string, apiKey: string | undefined, guid: string): Promise<string> {
  while (true) {
    await delay(3000)

    const {data} = await axios.get(api, {
      params: {
        apiKey,
        module: 'contract',
        action: 'checkverifystatus',
        guid,
      },
    })
    if (data.result !== VerificationStatus.PENDING) {
      return data.result
    }
  }
}
