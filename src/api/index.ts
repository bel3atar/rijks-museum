import { BASE_URL } from './constants'
import { attachSearchParams, cleanupResults } from './helpers'

import type { CollectionRequestConfig, ApiResponse } from './types'

export const fetchCollection = async (config: CollectionRequestConfig): Promise<ApiResponse> => {
  const url = attachSearchParams(BASE_URL, config)
  return fetch(url)
    .then((response) => response.json())
    .then(cleanupResults) as Promise<ApiResponse>
}
