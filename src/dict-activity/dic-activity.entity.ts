import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 15,
  })
  dict_activity: string;

  @Column({
    type: 'text',
    default: null,
  })
  description: string;

  @Column({
    default: false,
  })
  removable: boolean;
}
