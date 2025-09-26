import axios, { AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

const headersDefault = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json; charset=utf-8',
}

const xhr = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API || 'https://api.nimblefast.com.br',
  timeout: 40000,
  headers: {
    ...headersDefault,
  },
})

function getHeaders(cfg?: AxiosRequestConfig) {
  const token = getCookie('token')

  if (!cfg) {
    return {
      headers: {
        authorization: `Bearer ${token}`,
        ...headersDefault,
      },
    }
  }

  return {
    ...cfg,
    headers: {
      authorization: `Bearer ${token}`,
      ...headersDefault,
      ...cfg.headers,
    },
  }
}

async function get<R>(url: string, cfg?: AxiosRequestConfig): Promise<R> {
  return xhr
    .get(url, getHeaders(cfg))
    .then(({ data }) => data)
    .catch((error) => {
      throw Error(error?.response?.data?.message)
    })
}

async function post<R, D>(url: string, { arg: data }: { arg: D }): Promise<R> {
  return xhr
    .post(url, data, getHeaders({}))
    .then(({ data }) => data)
    .catch((error) => {
      throw Error(error?.response?.data?.message)
    })
}

async function put<R, D>(url: string, { arg: data }: { arg: D }): Promise<R> {
  return xhr
    .put(url, data, getHeaders({}))
    .then(({ data }) => data)
    .catch((error) => {
      throw Error(error?.response?.data?.message)
    })
}

async function del<R>(url: string): Promise<R> {
  return xhr
    .delete(url, getHeaders({}))
    .then(({ data }) => data)
    .catch((error) => {
      throw Error(error?.response?.data?.message)
    })
}

export const api = {
  get,
  post,
  put,
  del,
}
