import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from '../../entities/event_category/event_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventCategoryService {

    constructor(@InjectRepository(EventCategory)
    private eventCategoryRepository: Repository<EventCategory>) {

    }
    async findAll(): Promise<EventCategory[]> {
        try {
            const event_categories = await this.eventCategoryRepository.find();
            if (!event_categories) throw new Error("Categories not found");

            return event_categories
        } catch (err) {
            throw new Error(`Error while finding event categories: ${err.message}`);
        }
    }

    async findById(id: number): Promise<EventCategory> {
        try {

            const eventCategory = await this.eventCategoryRepository.findOne({ where: { id } });
            if (!eventCategory) throw new Error(`Event category with id ${id} not found`);
            return eventCategory;

        } catch (err) {
            throw new Error(`Error while finding event category: ${err.message}`);
        }
    }

    async create(eventCategory: EventCategory): Promise<EventCategory> {
        try {
            const eventSaved = await this.eventCategoryRepository.save(eventCategory);

            return eventSaved
        } catch (error) {
            throw new Error(`Error while creating event category: ${error.message}`);
        }
    }

    async update(id: number, eventCategory: EventCategory): Promise<EventCategory> {
        try {
            await this.eventCategoryRepository.update(id, eventCategory);

            const updatedEventCategory = await this.eventCategoryRepository.findOne({ where: { id } });

            if (!updatedEventCategory) throw new Error(`Event category with id ${id} not found`);

            return updatedEventCategory;
        } catch (err) {
            throw new Error(`Error while updating event category: ${err.message}`);
        }
    }

    async delete(id: number): Promise<EventCategory> {
        try {
            const eventCategory = await this.eventCategoryRepository.findOne({ where: { id } });

            if(!eventCategory) throw new Error(`Event category with id ${id} not found`);

            const deleted = await this.eventCategoryRepository.remove(eventCategory);

            return deleted
        } catch (err) {
            throw new Error(`Error while deleting event category: ${err.message}`);
        }
    }
}
