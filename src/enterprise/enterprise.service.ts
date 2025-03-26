import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { Address } from './entities/address.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(dto: CreateEnterpriseDto): Promise<Enterprise> {
    const address = this.addressRepository.create(dto.address);
    await this.addressRepository.save(address);

    const enterprise = this.enterpriseRepository.create({
      ...dto,
      address,
    });

    return this.enterpriseRepository.save(enterprise);
  }

  async findAll(): Promise<Enterprise[]> {
    return this.enterpriseRepository.find({ relations: ['address'] });
  }

  async findOne(id: string): Promise<Enterprise> {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise with ID ${id} not found`);
    }

    return enterprise;
  }

  async update(id: string, dto: UpdateEnterpriseDto): Promise<Enterprise> {
    const enterprise = await this.findOne(id);

    if (dto.address) {
      await this.addressRepository.update(enterprise.address.id, dto.address);
    }

    Object.assign(enterprise, dto);
    return this.enterpriseRepository.save(enterprise);
  }

  async delete(id: string): Promise<void> {
    const enterprise = await this.findOne(id);
    await this.enterpriseRepository.remove(enterprise);
  }
}
