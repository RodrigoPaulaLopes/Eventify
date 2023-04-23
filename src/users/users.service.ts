import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      async findById(id: number): Promise<User> {
        return this.userRepository.findOne({where: {id: id}});
      }
    
      async create(user: User): Promise<User> {
        return this.userRepository.save(user);
      }
    
      async update(id: number, user: User): Promise<User> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({where: {id: id}});
      }
    
      async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }
    
      async login(email: string, password: string): Promise<User> {
        return this.userRepository.findOne({where : { email: email, password: password }});
      }

}
