import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizer } from '../../entities/organizer/organizer.entity';

@Injectable()
export class OrganizerService {

  constructor(
    @InjectRepository(Organizer)
    private organizerRepository: Repository<Organizer>,
  ) { }

  async findAll(): Promise<Organizer[]> {
    try {
      const organizers = await this.organizerRepository.find({ relations: ['organizerCategory'] });
      return organizers;
    } catch (err) {
      throw new Error(`Failed to retrieve all organizers: ${err.message}`);
    }
  }

  async findById(id: number): Promise<Organizer> {
    try {
      const organizer = await this.organizerRepository.findOne({ where: { id: id }, relations: ['organizerCategory'] });
      if (!organizer) throw new Error(`Organizer with id ${id} not found`);
      return organizer;
    } catch (err) {
      throw new Error(`Failed to retrieve organizer with id ${id}: ${err.message}`);
    }
  }

  async create(organizer: Organizer): Promise<Organizer> {
    try {
      const newOrganizer = await this.organizerRepository.save(organizer);
      return newOrganizer;
    } catch (err) {
      throw new Error(`Failed to create organizer: ${err.message}`);
    }
  }

  async update(id: number, organizer: Organizer): Promise<Organizer> {
    try {
      await this.organizerRepository.update(id, organizer);
      const updatedOrganizer = await this.organizerRepository.findOne({ where: { id: id }, relations: ['organizerCategory'] });
      if (!updatedOrganizer) throw new Error(`Organizer with id ${id} not found after update`);
      return updatedOrganizer;
    } catch (err) {
      throw new Error(`Failed to update organizer with id ${id}: ${err.message}`);
    }
  }

  async delete(id: number): Promise<Organizer> {
    try {
      const organizer = await this.organizerRepository.findOne({ where: { id: id }, relations: ['organizerCategory'] });
      if (!organizer) throw new Error(`Organizer with id ${id} not found`);
      const deleted = await this.organizerRepository.remove(organizer);
      return deleted
    } catch (err) {
      throw new Error(`Failed to delete organizer with id ${id}: ${err.message}`);
    }
  }
}
