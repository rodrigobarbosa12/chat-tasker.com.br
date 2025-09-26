'use client'

import { AxiosRequestConfig } from 'axios'
import { api, exibirError } from 'src/adapters'
import nextSWR from 'swr'

type Response<T> = {
  data: NonNullable<T>
  loading: boolean
  mutate: () => void
  error: unknown
}

interface Options {
  showError?: boolean
}

export function useGetSWR<T>(
  pathKey: string,
  config?: AxiosRequestConfig & Options,
  shouldFetch = true,
): Response<T> {
  if (!shouldFetch) {
    nextSWR('')
    return { data: undefined, mutate: () => undefined } as Response<T>
  }

  const { data, error, mutate } = nextSWR<T>(
    pathKey,
    (): Promise<T> => api.get(pathKey, config),
  )

  if (config && config.showError && error) {
    exibirError(error)
  }

  return { data, mutate, loading: !error && !data, error }
}
