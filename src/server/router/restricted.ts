import { createRouter } from './context'
import { z } from 'zod'

export const restrictedRouter = createRouter().query(
  'get-data-by-session-email',
  {
    input: z
      .object({
        email: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        collections: [
          {
            name: input?.email,
            collectionName: 'newNftCollection',
          },
        ],
      }
    },
  }
)
