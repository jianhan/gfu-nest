import { Entity, Column, ObjectIdColumn, ObjectID, Index } from 'typeorm';
import { Provider } from './provider.entity';

@Entity()
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
  @Index({ unique: true })
  provider: Provider;
}
