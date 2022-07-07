export type IinitializeLayerData = (params: IinitialLayer) => void

export type IinitialLayer = {
  layerName: string
  attributes: Array<string>
}

export type IlayerData = Array<{
  layerName: string
  attributes: Array<{
    layer: string
    name: string
    image: string
  }>
}>
