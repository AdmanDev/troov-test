import type { BaseResponse } from '../types/requests/BaseResponse'

export const useApiFetch = <T>(endpoint: string, options = {}) => {
  const config = useRuntimeConfig()
  const { $apiFetch } = useNuxtApp()

  return useFetch<T>(endpoint, {
    ...options,
    baseURL: config.public.apiBaseUrl as string,
    $fetch: $apiFetch,
    transform: transformer,
  })
}

const transformer = <T>(response: unknown) => {
  const resp = response as BaseResponse<T>
  if (!resp || resp.isError) {
    throw new Error(resp?.errorMessage || 'Une erreur est survenue')
  }

  return resp.data
}
