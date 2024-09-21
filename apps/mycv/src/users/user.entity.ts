import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Exclude } from 'class-transformer';

// Community convention
// name the entity class in singular form without type
@Entity() // Check and create table in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number; // auto generated

  @Column()
  email: string;

  @Column()
  // @Exclude() // Exclude password from the response
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
