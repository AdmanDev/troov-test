export const useApiFetch = <T>(endpoint: string, options = {}) => {
  const { $apiFetch } = useNuxtApp()

  return useFetch<T>(endpoint, {
    ...options,
    $fetch: $apiFetch,
  })
}
