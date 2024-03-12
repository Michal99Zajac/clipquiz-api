import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export const scoreBodySchema = z.object({
  answers: z.record(
    z
      .string({
        description: 'A question ID',
      })
      .transform(Number),
    z
      .string({
        description: 'An answer ID',
      })
      .transform(Number),
  ),
})

export const scoreParamsSchema = z.object({
  quizId: z.string().transform(Number),
})

export const score200ResponseSchema = z.object({
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

export const score404ResponseSchema = z.object({
  message: z.string(),
})

export const score400ResponseSchema = z.object({
  message: z.string(),
})

export const scoreBodyJsonSchema = zodToJsonSchema(scoreBodySchema)
export const scoreParamsJsonSchema = zodToJsonSchema(scoreParamsSchema)
export const score200ResponseJsonSchema = zodToJsonSchema(score200ResponseSchema)
export const score404ResponseJsonSchema = zodToJsonSchema(score404ResponseSchema)
export const score400ResponseJsonSchema = zodToJsonSchema(score400ResponseSchema)

export type ScoreParams = z.infer<typeof scoreParamsSchema>
export type ScoreBody = z.infer<typeof scoreBodySchema>
export type Score200Response = z.infer<typeof score200ResponseSchema>
export type Score404Response = z.infer<typeof score404ResponseSchema>
export type Score400Response = z.infer<typeof score400ResponseSchema>
export type ScoreResponse = Score200Response | Score404Response | Score400Response
