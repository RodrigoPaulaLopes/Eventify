import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from './event_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventCategoryService {

    constructor(@InjectRepository(EventCategory)
    private eventCategoryRepository: Repository<EventCategory>) {

    }
    async findAll(): Promise<EventCategory[]> {
        return this.eventCategoryRepository.find();
    }

    async findById(id: number): Promise<EventCategory> {
        return this.eventCategoryRepository.findOne({ where: { id: id } });
    }

    async create(eventCategory: EventCategory): Promise<EventCategory> {
        return this.eventCategoryRepository.save(eventCategory);
    }

    async update(id: number, eventCategory: EventCategory): Promise<EventCategory> {
        await this.eventCategoryRepository.update(id, eventCategory);
        return this.eventCategoryRepository.findOne({ where: { id: id } });
    }

    async delete(id: number): Promise<void> {
        await this.eventCategoryRepository.delete(id);
    }
}
