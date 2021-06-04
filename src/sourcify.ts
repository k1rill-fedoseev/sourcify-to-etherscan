import axios from 'axios'
import {SOURCIFY_API} from './constants'

export async function check(chainId: number, contract: string): Promise<string> {
  const {data} = await axios.get(`${SOURCIFY_API}check-by-addresses`, {
    params: {
      addresses: contract,
      chainIds: chainId,
    },
  })
  if (!data || !data[0]) {
    return 'false'
  }
  return data[0].status
}

export async function files(chainId: number, contract: string): Promise<any> {
  const {data} = await axios.get(`${SOURCIFY_API}files/${chainId}/${contract}`)

  return data
}

export type Metadata = {
  language: string;
  settings: any;
}
type SourcifyOutput = {
  metadata: Metadata;
  version: string;
  sources: any;
  target: string;
  constructorArgs: string;
}
type FileContent = {
  content: string;
}
type File = FileContent & {
  name: string;
  path: string;
}

export function parseFiles(files: any): SourcifyOutput {
  const metadata = JSON.parse(files.find((file: File) => file.name === 'metadata.json').content)
  const constructorArgs = files.find((file: File) => file.name === 'constructor-args.txt')
  const sourcesArray = files.filter((file: File) => file.name !== 'metadata.json' && file.name !== 'constructor-args.txt')
  const version = `v${metadata.compiler.version}`
  const target = Object.entries(metadata.settings.compilationTarget)[0].join(':')
  const sources: {[key: string]: FileContent} = {}

  const prefix = sourcesArray[0].path.match(/^.*\/sources\//)[0]
  for (const file of sourcesArray) {
    const path = file.path.replace('sources/_', 'sources/@').slice(prefix.length)
    sources[path] = {content: file.content}
  }

  return {
    metadata,
    version,
    target,
    sources,
    constructorArgs: constructorArgs ? constructorArgs.content.slice(2) : '',
  }
}
