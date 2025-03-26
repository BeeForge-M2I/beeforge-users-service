import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { Address } from '../addresses/address.entity';

@Entity('enterprise')
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

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address!: Address;

  @ManyToOne(() => Subscription, { eager: true })
  @JoinColumn({ name: 'subscription_id' })
  subscription!: Subscription;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;
}
