import { z } from 'zod'

export const qestionSchema = z.object({
  id: z.number(),
  content: z.string(),
  occurrence: z.number(),
})
