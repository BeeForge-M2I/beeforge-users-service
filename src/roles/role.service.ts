import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async initializeRole() {
    try {
      await this.create({
        name: 'ADMIN',
      });
      await this.create({
        name: 'USER',
      });
      console.log('Génération des rôles par défaut.');
    } catch (error) {
      console.error("Erreur lors de l'initialisation des rôles :", error);
    }
  }

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: string) {
    return this.roleRepository.findOne({ where: { id } });
  }

  async create(createRoleDto: RoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    if (!role) {
      throw new Error('Role not found');
    }
    return this.roleRepository.remove(role);
  }
}
