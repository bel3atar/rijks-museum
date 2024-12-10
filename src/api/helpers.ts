import { PARAMS_CONFIG } from './constants'
import type {
  CollectionRequestConfig,
  AllowedParams,
  ParamsConfig,
  ApiResponse,
  ArtObject,
} from './types'

const pipe =
  (...fns: Function[]) =>
  (input: unknown) =>
    fns.reduce((result, fn) => fn(result), input)

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

const assignDefaultImageIfNull = (artObject: ArtObject): ArtObject => {
  if (artObject.webImage !== null) return artObject
  return {
    ...artObject,
    webImage: { url: 'https://placehold.co/400x400?text=No+photo' },
  }
}
const fixPicturelessItems = ({ artObjects, ...rest }: ApiResponse): ApiResponse => ({
  ...rest,
  artObjects: artObjects.map(assignDefaultImageIfNull),
})

const removeUnnecessaryFields = ({ artObjects, count }: ApiResponse): ApiResponse => ({
  count,
  artObjects: artObjects.map(({ id, webImage, title }) => ({ id, webImage, title })),
})

export const cleanupResults = pipe(removeUnnecessaryFields, fixPicturelessItems)
