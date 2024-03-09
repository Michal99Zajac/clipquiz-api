import { z } from 'zod'

import { quizSchema } from '@/schemas/quizSchema'

export const quizWithQuestionSchema = quizSchema.extend({
  questions: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
      occurrence: z.number(),
      answers: z.array(
        z.object({
          id: z.number(),
          content: z.string(),
        }),
      ),
    }),
  ),
})
