import { z } from 'zod'

export const questionSchema = z.object({
  id: z.number(),
  content: z.string(),
  occurrence: z.number(),
  answers: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
      isCorrect: z.boolean(),
    }),
  ),
})
