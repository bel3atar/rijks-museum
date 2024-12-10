import type { ParamsConfig } from './types'

export const BASE_URL = 'https://www.rijksmuseum.nl/api/en/collection'

export const PARAMS_CONFIG: ParamsConfig = {
  resultsPerPage: { searchParamName: 'ps' },
  searchQuery: { searchParamName: 'q' },
  key: { defaultValue: import.meta.env.VITE_API_KEY, required: true },
  page: { searchParamName: 'p' },
}
