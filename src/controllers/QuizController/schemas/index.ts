import { z } from 'zod'

export const getQuizzesQuerystringSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
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
export type GetQuizzesQuerystring = z.infer<typeof getQuizzesQuerystringSchema>
