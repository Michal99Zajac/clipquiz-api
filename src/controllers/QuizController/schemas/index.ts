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
  title: z.string(),
})

export const quizParamsSchema = z.object({
  quizId: z.string(),
})

export const updateQuizBodySchema = createQuizBodySchema

export type UpdateQuizBody = z.infer<typeof updateQuizBodySchema>
export type QuizParams = z.infer<typeof quizParamsSchema>
export type CreateQuizBody = z.infer<typeof createQuizBodySchema>
export type ListQuizzesQuerystring = z.infer<typeof listQuizzesQuerystringSchema>
