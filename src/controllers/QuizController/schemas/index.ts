import { z } from 'zod'

export const listQuizzesQuerystringSchema = z.object({
  limit: z
    .string()
    .transform((limit) => Number(limit))
    .optional(),
  offset: z
    .string()
    .transform((offset) => Number(offset))
    .optional(),
})

export const createQuizBodySchema = z.object({
  title: z.string().max(255),
  description: z.string().max(1024),
  thumbnail: z.string().url(),
  videoUrl: z.string().url(),
  videoDuration: z.number().int().positive(),
  questions: z.array(
    z.object({
      content: z.string().max(2048),
      occurrence: z.number().int().positive(),
      answers: z
        .array(
          z.object({
            content: z.string().max(2048),
            isCorrect: z.boolean(),
          }),
        )
        .length(4),
    }),
  ),
})

export const quizParamsSchema = z.object({
  quizId: z.string(),
})

export const updateQuizBodySchema = z.object({
  title: z.string().max(255),
  description: z.string().max(1024),
  thumbnail: z.string().url(),
  videoUrl: z.string().url(),
  videoDuration: z.number().int().positive(),
})

export type UpdateQuizBody = z.infer<typeof updateQuizBodySchema>
export type QuizParams = z.infer<typeof quizParamsSchema>
export type CreateQuizBody = z.infer<typeof createQuizBodySchema>
export type ListQuizzesQuerystring = z.infer<typeof listQuizzesQuerystringSchema>
