import { PARAMS_CONFIG } from './constants'
import type { CollectionRequestConfig, AllowedParams, ParamsConfig } from './types'

export const attachSearchParams = (url: string, params: CollectionRequestConfig = {}): URL =>
  (Object.entries(PARAMS_CONFIG) as [AllowedParams, ParamsConfig[AllowedParams]][]).reduce(
    (result, [paramName, { defaultValue, searchParamName, required }]): URL => {
      const isSet = params[paramName] !== undefined
      if (isSet) result.searchParams.set(searchParamName ?? paramName, String(params[paramName]))
      else if (defaultValue !== undefined && required)
        result.searchParams.set(searchParamName ?? paramName, String(defaultValue))
      return result
    },
    new URL(url),
  )
