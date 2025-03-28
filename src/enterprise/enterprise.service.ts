import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { Address } from './entities/address.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class EnterpriseService {
  private readonly logger = new Logger(EnterpriseService.name);

  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async findAll(): Promise<Enterprise[]> {
    return this.enterpriseRepository.find({ relations: ['addresses'] });
  }

  async findOne(id: string): Promise<Enterprise> {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise with ID ${id} not found`);
    }

    return enterprise;
  }

  async create(
    userId: string,
    createEnterpriseDto: CreateEnterpriseDto,
  ): Promise<Enterprise> {
    const { addresses, ...enterpriseData } = createEnterpriseDto;

    const newEnterprise = this.enterpriseRepository.create({
      ...enterpriseData,
      userId,
    });

    const savedEnterprise = await this.enterpriseRepository.save(newEnterprise);

    const addressEntities = addresses.map((address) => {
      return this.addressRepository.create({
        ...address,
        enterprise: savedEnterprise,
      });
    });

    await this.addressRepository.save(addressEntities);

    return savedEnterprise;
  }

  async update(id: string, dto: UpdateEnterpriseDto): Promise<Enterprise> {
    const enterprise = await this.findOne(id);

    if (dto.addresses) {
      await this.addressRepository.delete({ enterprise: { id } });

      const newAddresses = dto.addresses.map((addr) => {
        return this.addressRepository.create({ ...addr, enterprise });
      });

      await this.addressRepository.save(newAddresses);
      enterprise.addresses = newAddresses;
    }

    Object.assign(enterprise, dto);
    return this.enterpriseRepository.save(enterprise);
  }

  async delete(id: string): Promise<void> {
    const enterprise = await this.findOne(id);
    await this.enterpriseRepository.remove(enterprise);
  }
}
