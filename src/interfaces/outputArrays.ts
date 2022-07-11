export interface IoutputArrays {
  imageArray: Array<{
    id: string
    generatedImage: string
  }>

  jsonArray: Array<{
    id: string
    generatedJson: string
  }>

  jsonSingleFile: string
}

export type TimageArray = Array<{
  id: string
  generatedImage: string
}>

export type TjsonArray = Array<{
  id: string
  generatedJson: string
}>
