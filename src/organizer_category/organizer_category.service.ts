import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizerCategory } from './organizer_category.entity';

@Injectable()
export class OrganizerCategoryService {
    constructor(
        @InjectRepository(OrganizerCategory)
        private organizerCategoryRepository: Repository<OrganizerCategory>,
    ) { }

    async findAll(): Promise<OrganizerCategory[]> {
        return this.organizerCategoryRepository.find();
    }

    async findById(id: number): Promise<OrganizerCategory> {
        return this.organizerCategoryRepository.findOne({ where: { id: id } });
    }

    async create(organizerCategory: OrganizerCategory): Promise<OrganizerCategory> {
        return this.organizerCategoryRepository.save(organizerCategory);
    }

    async update(id: number, organizerCategory: OrganizerCategory): Promise<OrganizerCategory> {
        await this.organizerCategoryRepository.update(id, organizerCategory);
        return this.organizerCategoryRepository.findOne({ where: { id: id } });
    }

    async delete(id: number): Promise<void> {
        await this.organizerCategoryRepository.delete(id);
    }
}
