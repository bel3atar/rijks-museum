export type ArtObject = {
  id: string
  webImage: { url: string }
}
export type ApiResponse = {
  count: number
  artObjects: ArtObject[]
}

export type AllowedParams = 'resultsPerPage' | 'page' | 'key' | 'searchQuery'
export type CollectionRequestConfig = Partial<{ [Property in AllowedParams]: string | number }>
export type ParamsConfig = {
  [Property in AllowedParams]: {
    searchParamName?: string
    defaultValue?: unknown
    required?: boolean
  }
}
