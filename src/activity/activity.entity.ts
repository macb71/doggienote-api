import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 36,
  })
  id_dog: string;

  @Column({
    length: 36,
  })
  id_dict_activity: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date_of_activity: Date;

  @Column({
    type: 'text',
    default: null,
  })
  description: string | null;

  @Column({ type: 'float', precision: 4, scale: 2 })
  activity_duration: number | null;
}
