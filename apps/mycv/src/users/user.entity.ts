import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Community convention
// name the entity class in singular form without type
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
