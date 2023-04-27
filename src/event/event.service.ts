import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity'
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from 'src/users/entities/users.entity';
import { async } from 'rxjs';

@Injectable()
export class EventService {

    constructor(@InjectRepository(Event)
    private eventRepository: Repository<Event>,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async findAll(userId: number): Promise<Event[]> {
        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')
        const events = await this.eventRepository.find({ relations: ['eventCategory'] });

        if (!events) {
            throw new NotFoundException('events are empty')
        }
        return events
    }

    async findById(id: number, userId: number): Promise<Event> {

        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (!user) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const event = await this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] });

        if (!event) {
            throw new NotFoundException('events are empty')
        }
        return event

    }

    async create(event: CreateEventDto, userId: number): Promise<Event> {

        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')
        const eventCreated = await this.eventRepository.save(event);

        return eventCreated


    }

    async update(id: number, event: CreateEventDto, userId: number): Promise<Event> {

        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const eventUpdated = await this.eventRepository.update(id, event);

        if (eventUpdated.affected == 0) throw new BadRequestException('error in update event')

        return this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] });




    }

    async delete(id: number, userId: number): Promise<Event> {
        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')
        const event = await this.eventRepository.findOne({ where: { id: id }, relations: ['eventCategory'] });

        if (!event) {
            throw new NotFoundException("Event not found");

        }
        const eventRemoved = await this.eventRepository.remove(event);

        return eventRemoved;


    }
}
