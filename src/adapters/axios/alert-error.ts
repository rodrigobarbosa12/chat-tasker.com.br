import get from 'lodash/get'
import { toast } from 'react-toastify'

interface ErrorCatch {
  response?: {
    data?: {
      message: string
    }
  }
  message?: string
}

export function exibirError(e: unknown): void {
  const error = e as ErrorCatch
  const message = 'Algo deu errado, tente novamente mais tarde'

  if (error?.response?.data?.message) {
    toast.error(get(error, 'response.data.message', message))

    return
  }

  if (error?.message) {
    toast.error(get(error, 'message', message), { toastId: 2 })

    return
  }

  toast.error(get(error, 'response.data.message', message), { toastId: 3 })
}
