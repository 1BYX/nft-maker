import { createRouter } from './context'
import { z } from 'zod'

export const nftGenerationRouter = createRouter().mutation('generate-nfts', {
  input: z.object({
    layers: z
      .array(
        z.object({
          layerName: z.string(),
          attributes: z.array(
            z.object({
              layer: z.string(),
              name: z.string(),
              image: z.string(),
            })
          ),
        })
      )
      .nullish(),
    config: z.object({
      format: z.object({
        width: z.number(),
        height: z.number(),
      }),
      baseUri: z.string(),
      description: z.string(),
      uniqueDnaTorrance: z.number(),
      namePrefix: z.string(),
      network: z.string(),
      layerConfigurations: z.object({
        growEditionSizeTo: z.number(),
        layersOrder: z.array(
          z.object({
            name: z.string(),
          })
        ),
      }),
    }),
  }),
  async resolve({ input }) {
    // const {imageArray, jsonArray, jsonSingleFile} = await GENERATE(input.layers, input.config)

    return { success: true, yourInput: input }
  },
})
