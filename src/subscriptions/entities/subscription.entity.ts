import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enterprise } from '../../enterprises/enterprise.entity';
import { SubscriptionType } from './subscriptionType.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => SubscriptionType, { eager: true, nullable: false })
  type!: SubscriptionType;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.subscription, {
    eager: true,
    nullable: false,
  })
  enterprise!: Enterprise;

  @CreateDateColumn({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @BeforeInsert()
  setDates() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.startDate.getDate() + 30);
  }
}
