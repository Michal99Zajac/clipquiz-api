import { z } from 'zod'

export const scoreBodySchema = z.object({
  answers: z.record(
    z.number({
      description: 'A question ID',
    }),
    z.number({
      description: 'An answer ID',
    }),
  ),
})

export const scoreParams = z.object({
  quizId: z.number(),
})

export const score200Response = z.object({
  score: z.number(),
  quiz: z.object({
    id: z.number(),
    videoUrl: z.string().url(),
    videoDuration: z.number().int().positive(),
    thumbnail: z.string().url(),
    title: z.string(),
    description: z.string(),
    questions: z.array(
      z.object({
        id: z.number(),
        content: z.string(),
        occurrence: z.number().int().positive(),
        isCorrect: z.boolean(),
        answers: z.array(
          z.object({
            id: z.number(),
            content: z.string(),
            isCorrect: z.boolean(),
            isAnswer: z.boolean(),
          }),
        ),
      }),
    ),
  }),
})

export const score404Response = z.object({
  message: z.string(),
})

export const score400Response = z.object({
  message: z.string(),
})

export type ScoreParams = z.infer<typeof scoreParams>
export type ScoreBody = z.infer<typeof scoreBodySchema>
export type Score200Response = z.infer<typeof score200Response>
export type Score404Response = z.infer<typeof score404Response>
export type Score400Response = z.infer<typeof score400Response>
export type ScoreResponse = Score200Response | Score404Response | Score400Response
