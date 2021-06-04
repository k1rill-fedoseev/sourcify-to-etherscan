import {Metadata} from './sourcify'

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function makeStandardJson(metadata: Metadata, sources: any) {
  return {
    language: metadata.language,
    sources,
    settings: {
      optimizer: metadata.settings.optimizer,
      evmVersion: metadata.settings.evmVersion,
      remappings: metadata.settings.remappings,
      libraries: metadata.settings.libraries,
    },
  }
}
