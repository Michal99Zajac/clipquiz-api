import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Question } from '@/models/Question'

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
    unique: true,
  })
  title: string

  @Column({
    length: 1024,
  })
  description: string

  @Column({
    length: 2048, // Browser URL length limit
  })
  thumbnail: string

  @Column({
    length: 2048, // Browser URL length limit
  })
  videoUrl: string

  @Column({
    unsigned: true,
  })
  videoDuration: number

  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: true,
  })
  questions: Question[]
}

export default Quiz
