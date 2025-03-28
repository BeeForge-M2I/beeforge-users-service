import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Enterprise } from './enterprise.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  postalCode!: string;

  @Column()
  country!: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.addresses, {
    onDelete: 'CASCADE',
  })
  enterprise!: Enterprise;
}
