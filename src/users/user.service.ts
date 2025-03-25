import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userData: Partial<CreateUserDto>): Promise<User> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: userData.subscriptionId },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const user = this.userRepository.create({
      ...userData,
      subscription,
    });

    return this.userRepository.save(user);
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (userData.subscriptionId) {
      const subscription = await this.subscriptionRepository.findOne({
        where: { id: userData.subscriptionId },
      });
      if (!subscription) {
        throw new NotFoundException('Subscription not found');
      }
      user.subscription = subscription;
    }

    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
