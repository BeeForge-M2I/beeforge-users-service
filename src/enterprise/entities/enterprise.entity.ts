import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity('enterprises')
export class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  siret!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  legalStatus!: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address!: Address;

  @Column({ nullable: true })
  subscriptionId?: string;
}
