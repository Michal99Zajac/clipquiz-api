import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Answer } from '@/models/Answer'
import Quiz from '@/models/Quiz'

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 2048,
  })
  content: string

  @Column({
    unsigned: true,
  })
  occurrence: number

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
  })
  answers: Answer[]

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz
}

export default Question
