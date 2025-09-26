'use client'

import { api, exibirError } from 'src/adapters'
import nextSWRMutation from 'swr/mutation'

interface Response<D> {
  create: <T, R>(x: T) => Promise<R>
  data: D
  error: unknown
}

interface Options {
  showError: boolean
}

export function usePostSWR<T>(pathKey: string, options?: Options): Response<T> {
  const { trigger, error, data } = nextSWRMutation<T>(pathKey, api.post)

  if (options && options.showError && error) {
    exibirError(error)
  }

  return { create: trigger, error, data }
}
