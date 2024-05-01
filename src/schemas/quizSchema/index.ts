import { z } from 'zod'

/**
 * Quiz schema. Typical quiz model representation in the response.
 */
export const quizSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
  videoUrl: z.string(),
  duration: z.number(),
})
