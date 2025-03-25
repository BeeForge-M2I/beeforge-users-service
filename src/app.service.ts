import { Injectable, OnModuleInit } from '@nestjs/common';
import { SubscriptionService } from './subscriptions/subscription.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  async onModuleInit() {
    const subscriptions = await this.subscriptionService.getAllSubscriptions();

    // Si aucune subscription n'existe, créer une subscription par défaut
    if (subscriptions.length === 0) {
      await this.subscriptionService.createSubscription({
        name: 'FREE',
        price: 0.0,
        isActive: true,
      });
    }
  }
}
