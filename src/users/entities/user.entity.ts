import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Provider } from './provider.entity';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatarUrl: string;

  @Column(type => Provider)
  provider: Provider;
}
