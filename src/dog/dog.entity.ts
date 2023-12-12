import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 60,
    default: null,
    nullable: true,
  })
  kennel_name: string|null;

  @Column({
    length: 60,
    default: null,
    nullable: true,
  })
  official_name: string|null;

  @Column({ type: 'date' })
  date_of_birth: Date;

}