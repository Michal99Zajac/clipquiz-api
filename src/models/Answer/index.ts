import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Question } from '@/models/Question'

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 1024,
  })
  content: string

  @Column()
  isCorrect: boolean

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question
}

export default Answer
