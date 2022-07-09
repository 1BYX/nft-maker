// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { nftGenerationRouter } from './nft-generation'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('generate.', nftGenerationRouter)

// export type definition of API
export type AppRouter = typeof appRouter
