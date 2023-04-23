import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../entities/event/event.entity'
import { Repository } from 'typeorm';

@Injectable()
export class EventService {

    constructor(@InjectRepository(Event)
    private eventRepository: Repository<Event>) { }

    async findAll(): Promise<Event[]> {
        return this.eventRepository.find({ relations: ['eventCategory'] });
    }

    async findById(id: number): Promise<Event> {
        return this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] } );
    }

    async create(event: Event): Promise<Event> {
        return this.eventRepository.save(event);
    }

    async update(id: number, event: Event): Promise<Event> {
        await this.eventRepository.update(id, event);
        return this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] } );
    }

    async delete(id: number): Promise<void> {
        await this.eventRepository.delete(id);
    }
}
