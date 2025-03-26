import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity('subscription_types')
export class SubscriptionType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price!: number;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Subscription, (subscription) => subscription.type)
  subscriptions!: Subscription[];
}
