import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity'
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {

    constructor(@InjectRepository(Event)
    private eventRepository: Repository<Event>) { }

    async findAll(): Promise<Event[]> {
        try {
            const events = await this.eventRepository.find({ relations: ['eventCategory'] });

            if(!events){
                throw new Error('events are empty')
            }
            return events
        } catch (error) {
            throw new Error(error.message);
            
        }
    }

    async findById(id: number): Promise<Event> {
        
        try {
            const event = await this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] } );

            if(!event){
                throw new Error('events are empty')
            }
            return event
        } catch (error) {
            throw new Error(error.message);
            
        }
    }

    async create(event: CreateEventDto): Promise<Event> {

        try {
            const eventCreated = await this.eventRepository.save(event);

            return eventCreated
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id: number, event: CreateEventDto): Promise<Event> {

        try {
            const eventUpdated = await this.eventRepository.update(id, event);
            return this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] } );
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    async delete(id: number): Promise<Event> {
        try {
            const event = await this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] } );

            if(!event){
                throw new Error("Event not found");
                
            }
            const eventRemoved = await this.eventRepository.remove(event);

            return eventRemoved;
        } catch (error) {
            throw new Error(error.message);
        }
       
    }
}
