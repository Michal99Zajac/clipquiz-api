import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
    unique: true,
  })
  email: string
}

export default User
