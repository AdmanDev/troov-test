export const useApi = (endpoint: string, options = {}) => {
  const config = useRuntimeConfig()

  return useFetch(endpoint, {
    baseURL: config.public.apiBaseUrl as string,
    ...options,
  })
}
