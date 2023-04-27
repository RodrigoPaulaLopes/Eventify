import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from './entities/event_category.entity';
import { Repository } from 'typeorm';
import { CreateEventCategoryDto } from './dto/create-event_category.dto';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class EventCategoryService {

    constructor(@InjectRepository(EventCategory)
    private eventCategoryRepository: Repository<EventCategory>,
        @InjectRepository(User)
        private userRepository: Repository<User>) {

    }
    async findAll(userId: number): Promise<EventCategory[]> {
        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const event_categories = await this.eventCategoryRepository.find();

        if (!event_categories) throw new Error("Categories not found");

        return event_categories

    }

    async findById(id: number, userId: number): Promise<EventCategory> {
        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const eventCategory = await this.eventCategoryRepository.findOne({ where: { id } });
        if (!eventCategory) throw new Error(`Event category with id ${id} not found`);
        return eventCategory;


    }

    async create(eventCategory: CreateEventCategoryDto, userId: number): Promise<EventCategory> {

        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const eventSaved = await this.eventCategoryRepository.save(eventCategory);

        return eventSaved

    }

    async update(id: number, eventCategory: CreateEventCategoryDto, userId: number): Promise<EventCategory> {
        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        await this.eventCategoryRepository.update(id, eventCategory);

        const updatedEventCategory = await this.eventCategoryRepository.findOne({ where: { id } });

        if (!updatedEventCategory) throw new Error(`Event category with id ${id} not found`);

        return updatedEventCategory;

    }

    async delete(id: number, userId: number): Promise<EventCategory> {

        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')
        
        const eventCategory = await this.eventCategoryRepository.findOne({ where: { id } });

        if (!eventCategory) throw new Error(`Event category with id ${id} not found`);

        const deleted = await this.eventCategoryRepository.remove(eventCategory);

        return deleted

    }
}
