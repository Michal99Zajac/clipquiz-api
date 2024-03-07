import { z } from 'zod'

/**
 * Quiz schema. Typical quiz model representation in the response.
 */
export const QuizSchema = z.object({
  id: z.number(),
  title: z.string(),
})
