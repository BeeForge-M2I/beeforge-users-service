import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionDto } from './dto/subscription.dto';
import { SubscriptionType } from './entities/subscriptionType.entity';
import { Enterprise } from '../enterprises/enterprise.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    private subscriptionTypeRepository: Repository<SubscriptionType>,
    private enterpriseRepository: Repository<Enterprise>,
  ) {}

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async getSubscriptionById(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async create(dto: SubscriptionDto): Promise<Subscription> {
    const type = await this.subscriptionTypeRepository.findOneBy({
      id: dto.typeId,
    });
    const enterprise = await this.enterpriseRepository.findOneBy({
      id: dto.enterpriseId,
    });

    if (!type) {
      throw new NotFoundException(
        `Subscription Type with ID ${dto.typeId} not found.`,
      );
    }

    if (!enterprise) {
      throw new NotFoundException(
        `Enterprise with ID ${dto.enterpriseId} not found.`,
      );
    }

    const subscription = this.subscriptionRepository.create({
      type,
      enterprise,
    });

    return this.subscriptionRepository.save(subscription);
  }

  async updateSubscription(
    id: string,
    subscriptionDto: Partial<SubscriptionDto>,
  ): Promise<Subscription | null> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found.`);
    }

    const updatedSubscription = this.subscriptionRepository.create({
      ...subscription,
      ...subscriptionDto,
    });

    await this.subscriptionRepository.update(id, updatedSubscription);
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async deleteSubscription(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
