import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Enterprise } from '../enterprises/enterprise.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price!: number;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Enterprise, (enterprise) => enterprise.subscription)
  enterprise!: Enterprise[];
}
