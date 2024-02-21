import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
  })
  title: string
}

export default Quiz
