import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';
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

  // 1 argument: a function that returns the class of the related entity, to know who to associate with
  // 2 argument: a function that returns the property on the related entity that will be used to make the association
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
