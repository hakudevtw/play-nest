import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  // 1 argument: a function that returns the class of the related entity, to know who to associate with
  // 2 argument: a function that returns the property on the related entity that will be used to make the association
  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  // Use callback format due to circular dependency
  // else one of the entities will be undefined
}
