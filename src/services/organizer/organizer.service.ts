import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizer } from '../../entities/organizer/organizer.entity';

@Injectable()
export class OrganizerService {

    constructor(
        @InjectRepository(Organizer)
        private organizerRepository: Repository<Organizer>,
      ) {}
    
      async findAll(): Promise<Organizer[]> {
        return this.organizerRepository.find({relations: ['organizerCategory']});
      }
    
      async findById(id: number): Promise<Organizer> {
        return this.organizerRepository.findOne({where: {id:id}, relations: ['organizerCategory']});
      }
    
      async create(organizer: Organizer): Promise<Organizer> {
        return this.organizerRepository.save(organizer);
      }
    
      async update(id: number, organizer: Organizer): Promise<Organizer> {
        await this.organizerRepository.update(id, organizer);
        return this.organizerRepository.findOne({where: {id:id}, relations: ['organizerCategory']});
      }
    
      async delete(id: number): Promise<void> {
        await this.organizerRepository.delete(id);
      }
}