import { Column } from 'typeorm';

export class Provider {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @Column()
  name: string;

  @Column()
  id: string;
}
