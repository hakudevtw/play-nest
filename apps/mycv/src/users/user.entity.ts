import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Community convention
// name the entity class in singular form without type
@Entity() // Check and create table in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number; // auto generated

  @Column()
  email: string;

  @Column()
  password: string;
}
