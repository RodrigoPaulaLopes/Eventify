import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizer } from './entities/organizer.entity';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class OrganizerService {

  constructor(
    @InjectRepository(Organizer)
    private organizerRepository: Repository<Organizer>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async findAll(userId: number): Promise<Organizer[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    const organizers = await this.organizerRepository.find({ relations: ['organizerCategory'] });
    return organizers;


  }

  async findById(id: number, userId: number): Promise<Organizer> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')
    const organizer = await this.organizerRepository.findOne({ where: { id: id }, relations: ['organizerCategory'] });

    if (!organizer) throw new NotFoundException(`Organizer with id ${id} not found`);
    return organizer;

  }

  async create(organizer: CreateOrganizerDto, userId: number): Promise<Organizer> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    const newOrganizer = await this.organizerRepository.save(organizer);
    return newOrganizer;

  }

  async update(id: number, organizer: CreateOrganizerDto, userId: number): Promise<Organizer> {

    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    await this.organizerRepository.update(id, organizer);

    const updatedOrganizer = await this.organizerRepository.findOne({ where: { id: id }, relations: ['organizerCategory'] });

    if (!updatedOrganizer) throw new Error(`Organizer with id ${id} not found after update`);

    return updatedOrganizer;

  }

  async delete(id: number, userId: number): Promise<Organizer> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    const organizer = await this.organizerRepository.findOne({ where: { id: id }, relations: ['organizerCategory'] });

    if (!organizer) throw new Error(`Organizer with id ${id} not found`);

    const deleted = await this.organizerRepository.remove(organizer);
    
    return deleted

  }
}
