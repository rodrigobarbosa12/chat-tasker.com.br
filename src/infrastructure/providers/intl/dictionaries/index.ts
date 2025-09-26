import { ptBR, es, enUS as EnUs } from 'date-fns/locale'
import { ptBr } from './collections/pt-BR'
import { enUS } from './collections/en-US'
import { esES } from './collections/es-ES'

export type Dictionary = typeof ptBr | typeof enUS | typeof esES

export const defaultDictionary = {
  'pt-BR': ptBr,
  'en-US': enUS,
  'es-ES': esES,
}

export const defaultDictionaryDateFns = {
  'pt-BR': ptBR,
  'en-US': EnUs,
  'es-ES': es,
}
