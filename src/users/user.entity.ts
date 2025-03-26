import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { Enterprise } from '../enterprises/enterprise.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isDeleted!: boolean;

  @OneToOne(() => Enterprise, (enterprise) => enterprise.id)
  enterprise!: Enterprise;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;
}
