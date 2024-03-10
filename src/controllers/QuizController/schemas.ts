import { z } from 'zod'

import { answerSchema } from '@/schemas/answerSchema'
import { quizSchema } from '@/schemas/quizSchema'

/* -------------------------------------------------------------------------- */
/*                                   GENERAL                                  */
/* -------------------------------------------------------------------------- */

export const paramsSchema = z.object({
  quizId: z.string(),
})

export const notFoundResponseSchema = z.object({
  message: z.string(),
})

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

export const listQuerystringSchema = z.object({
  limit: z
    .string()
    .transform((limit) => Number(limit))
    .optional(),
  offset: z
    .string()
    .transform((offset) => Number(offset))
    .optional(),
})

export const list200ResponseSchema = z.array(quizSchema)

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

export const createBodySchema = z.object({
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

export const create201ResponseSchema = quizSchema.extend({
  questions: z.array(
    quizSchema.extend({
      answers: z.array(answerSchema),
    }),
  ),
})

/* -------------------------------------------------------------------------- */
/*                                    READ                                    */
/* -------------------------------------------------------------------------- */

export const readParamsSchema = paramsSchema

export const read200ResponseSchema = quizSchema.extend({
  questions: z.array(
    quizSchema.extend({
      answers: z.array(answerSchema),
    }),
  ),
})

export const read404ResponseSchema = notFoundResponseSchema

/* -------------------------------------------------------------------------- */
/*                                   UPDATE                                   */
/* -------------------------------------------------------------------------- */

export const updateParamsSchema = paramsSchema

export const updateBodySchema = z.object({
  title: z.string().max(255),
  description: z.string().max(1024),
  thumbnail: z.string().url(),
  videoUrl: z.string().url(),
  videoDuration: z.number().int().positive(),
})

export const update200ResponseSchema = quizSchema

export const update404ResponseSchema = notFoundResponseSchema

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */

export const deleteParamsSchema = paramsSchema

export const delete204ResponseSchema = z.null()

export const delete404ResponseSchema = notFoundResponseSchema

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type List200Response = z.infer<typeof list200ResponseSchema>
export type Create201Response = z.infer<typeof create201ResponseSchema>
export type Read200Response = z.infer<typeof read200ResponseSchema>
export type Read404Response = z.infer<typeof read404ResponseSchema>
export type Update200Response = z.infer<typeof update200ResponseSchema>
export type Update404Response = z.infer<typeof update404ResponseSchema>
export type Delete204Response = z.infer<typeof delete204ResponseSchema>
export type Delete404Response = z.infer<typeof delete404ResponseSchema>
export type UpdateBody = z.infer<typeof updateBodySchema>
export type CreateBody = z.infer<typeof createBodySchema>
export type ReadParams = z.infer<typeof readParamsSchema>
export type UpdateParams = z.infer<typeof updateParamsSchema>
export type DeleteParams = z.infer<typeof deleteParamsSchema>
export type ListQuerystring = z.infer<typeof listQuerystringSchema>
