import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async initializeSubscription() {
    try {
      await this.createSubscription({
        name: 'FREE',
        price: 0.0,
        isActive: true,
      });
      await this.createSubscription({
        name: 'BASIC',
        price: 9.99,
        isActive: true,
      });
      await this.createSubscription({
        name: 'PRO',
        price: 19.99,
        isActive: true,
      });
      console.log('Abonnements par défaut ajoutés avec succès.');
    } catch (error) {
      console.error("Erreur lors de l'initialisation des abonnements :", error);
    }
  }

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create(
      createSubscriptionDto,
    );
    return this.subscriptionRepository.save(subscription);
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async getSubscriptionById(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async updateSubscription(
    id: string,
    updateSubscriptionDto: Partial<CreateSubscriptionDto>,
  ): Promise<Subscription | null> {
    await this.subscriptionRepository.update(id, updateSubscriptionDto);
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async deleteSubscription(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
