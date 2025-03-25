import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isDeleted!: boolean;

  @ManyToOne(() => Subscription, (subscription) => subscription.users, {
    eager: true,
  })
  @JoinColumn({ name: 'subscriptionId' })
  subscription!: Subscription;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionEndDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
