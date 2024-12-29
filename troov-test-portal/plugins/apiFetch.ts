import type { BaseResponse } from '~/types/requests/BaseResponse'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const snackbar = useSnackbar()

  const showSnackbarError = (message: string) => {
    snackbar.add({
      text: message,
      type: 'error',
    })
  }

  const $apiFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl as string,
    parseResponse: parseResponse,
    onRequestError: () => {
      showSnackbarError('Une erreur est survenue')
    },
    onResponseError: (resp) => {
      let message = 'Une erreur est survenue'
      const data = resp.response._data

      if (data?.errorMessage) {
        message = data.errorMessage
      }

      showSnackbarError(message)
    },
  })

  return {
    provide: {
      apiFetch: $apiFetch,
    },
  }
})

const parseResponse = (response: string) => {
  const resp: BaseResponse<unknown> = JSON.parse(response)

  if (!resp || resp.isError) {
    return resp
  }

  return resp.data
}