import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Address } from './address.entity';

@Entity('enterprises')
@Unique(['userId'])
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

  @OneToMany(() => Address, (address) => address.enterprise, { cascade: true })
  @JoinColumn()
  addresses!: Address[];

  @Column({ unique: true })
  userId!: string;
}
