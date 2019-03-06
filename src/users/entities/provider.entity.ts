import { Column } from 'typeorm';

export class Provider {
  @Column()
  name: string;

  @Column()
  id: string;
}
