import { z } from 'zod'

export const answerSchema = z.object({
  id: z.number(),
  content: z.string(),
})
