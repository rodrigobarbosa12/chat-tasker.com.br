'use client'

import { api, exibirError } from 'src/adapters'
import nextSWRMutation from 'swr/mutation'

interface Response {
  update: <T, R>(x: T) => Promise<R>
  error: unknown
}

interface Options {
  showError: boolean
}

export function useUpdateSWR<T>(pathKey: string, options?: Options): Response {
  const { trigger, error } = nextSWRMutation<T>(pathKey, api.put)

  if (options && options.showError && error) {
    exibirError(error)
  }

  return { update: trigger, error }
}
