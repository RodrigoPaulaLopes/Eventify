import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizerCategory } from './entities/organizer_category.entity';
import { CreateOrganizerCategoryDto } from './dto/create-organizer_category.dto';

@Injectable()
export class OrganizerCategoryService {
    constructor(
        @InjectRepository(OrganizerCategory)
        private organizerCategoryRepository: Repository<OrganizerCategory>,
    ) { }

    async findAll(): Promise<OrganizerCategory[]> {

        try {
            const c_organizer = await this.organizerCategoryRepository.find();
            if (!c_organizer) {
                throw new NotFoundException('organizer category is empty')
            }

            return c_organizer
        } catch (error) {
            throw new InternalServerErrorException('Error in server')
        }
    }

    async findById(id: number): Promise<OrganizerCategory> {
        try {
            const c_organizer = await this.organizerCategoryRepository.findOne({ where: { id: id } });
            if (!c_organizer) {
                throw new NotFoundException('Not found category organizer')
            }
            return c_organizer

            
        } catch (error) {
            throw new InternalServerErrorException('Error in server')
        }
    }

    async create(organizerCategory: CreateOrganizerCategoryDto): Promise<OrganizerCategory> {
        try {
            
            const saved = await this.organizerCategoryRepository.save(organizerCategory);

            return saved
        } catch (error) {
            throw new InternalServerErrorException('Error in server')
        }
    }

    async update(id: number, organizerCategory: CreateOrganizerCategoryDto): Promise<OrganizerCategory> {

        try {
            const updated = await this.organizerCategoryRepository.update(id, organizerCategory);
            if(updated.affected == 0){
                throw new InternalServerErrorException('error updating organizer category')
            }
            return this.organizerCategoryRepository.findOne({ where: { id: id } });
            
        } catch (error) {
            throw new InternalServerErrorException('Error in server')
        }
    }

    async delete(id: number): Promise<OrganizerCategory> {
        try {
            
            const c_organizer = await this.organizerCategoryRepository.findOne({where: {id: id}})

            if(!c_organizer){
                throw new NotFoundException("category organizer not found");
            }

            const deleted = await this.organizerCategoryRepository.remove(c_organizer)
            return deleted

        } catch (error) {
            throw new InternalServerErrorException('Error in server')
        }
    }
}
