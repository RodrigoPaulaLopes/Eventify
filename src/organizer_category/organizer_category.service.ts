import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OrganizerCategory } from './entities/organizer_category.entity';
import { CreateOrganizerCategoryDto } from './dto/create-organizer_category.dto';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class OrganizerCategoryService {
    constructor(
        @InjectRepository(OrganizerCategory)
        private organizerCategoryRepository: Repository<OrganizerCategory>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll(userId: number): Promise<any> {

        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const c_organizer = await this.organizerCategoryRepository.find();
        if (!c_organizer) {
            throw new NotFoundException('organizer category is empty')
        }

        return c_organizer

    }

    async findById(id: number, userId: number): Promise<OrganizerCategory> {

        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')
        const c_organizer = await this.organizerCategoryRepository.findOne({ where: { id: id } });
        if (!c_organizer) {
            throw new NotFoundException('Not found category organizer')
        }
        return c_organizer



    }

    async create(organizerCategory: CreateOrganizerCategoryDto, userId: number): Promise<OrganizerCategory> {

        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const saved = await this.organizerCategoryRepository.save(organizerCategory);

        return saved

    }

    async update(id: number, organizerCategory: CreateOrganizerCategoryDto, userId: number): Promise<OrganizerCategory> {

        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')

        const updated = await this.organizerCategoryRepository.update(id, organizerCategory);
        if (updated.affected == 0) {
            throw new InternalServerErrorException('error updating organizer category')
        }
        return this.organizerCategoryRepository.findOne({ where: { id: id } });


    }

    async delete(id: number, userId: number): Promise<OrganizerCategory> {

        const user = await this.userRepository.findOne({ where: { id: userId } })

        if (user == null) throw new NotFoundException('user not found')

        if (user.isAdmin != true) throw new BadRequestException('user is not admin')
        
        const c_organizer = await this.organizerCategoryRepository.findOne({ where: { id: id } })

        if (!c_organizer) {
            throw new NotFoundException("category organizer not found");
        }

        const deleted = await this.organizerCategoryRepository.remove(c_organizer)
        return deleted

 
}
}
