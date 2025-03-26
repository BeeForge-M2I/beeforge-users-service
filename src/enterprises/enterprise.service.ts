import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './enterprise.entity';
import { Address } from '../addresses/address.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { User } from '../users/user.entity';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createEnterprise(dto: CreateEnterpriseDto): Promise<Enterprise> {
    const address = this.addressRepository.create(dto.address);
    await this.addressRepository.save(address);

    const subscription = await this.subscriptionRepository.findOne({
      where: { id: dto.subscriptionId },
    });
    if (!subscription) throw new Error('Subscription not found');

    const owner = await this.userRepository.findOne({
      where: { id: dto.ownerId },
    });
    if (!owner) throw new Error('User not found');

    const enterprise = this.enterpriseRepository.create({
      ...dto,
      address,
      subscription,
      owner,
    });

    return this.enterpriseRepository.save(enterprise);
  }

  async getAllEnterprises(): Promise<Enterprise[]> {
    return this.enterpriseRepository.find({
      relations: ['subscription', 'address', 'owner'],
    });
  }

  async getEnterpriseById(id: string): Promise<Enterprise | null> {
    return this.enterpriseRepository.findOne({
      where: { id },
      relations: ['subscription', 'address', 'owner'],
    });
  }

  async deleteEnterprise(id: string): Promise<void> {
    await this.enterpriseRepository.delete(id);
  }
}
