import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../../entities/users/users.entity';
import  { hashPassword, comparePass } from 'src/helpers/passwordHelper.helper';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    const users  = await this.userRepository.find();

    if(!users){
      throw new NotFoundException('users not found')
    }

    return users;
  }

  async findById(id: number): Promise<User> {
    const user  = await this.userRepository.findOne({ where: { id: id } });

    if(!user){
      throw new NotFoundException('user not found.')
    }
    return user;
  }

  async create(user: User): Promise<User> {
    try {
      const password = await hashPassword(user.password)
      const saved = await this.userRepository.save({ ...user, password: password });
  
      return saved
    } catch (error) {
        throw new InternalServerErrorException('error creating user');
    }
   
  }

  async update(id: number, user: User): Promise<User> {
    try {
      const password = await hashPassword(user.password)
      const updated = await this.userRepository.update(id, { ...user, password: password });
      if(updated.affected == 0){
        throw new InternalServerErrorException('error updating user')
      }
      return await this.userRepository.findOne({ where: { id: id } });
      
    } catch (error) {
      throw new InternalServerErrorException('error updating user')
    }
   
  }

  async delete(id: number): Promise<User> {
    try {

      const user  = await this.userRepository.findOne({ where: { id: id } });

      if(!user){
        throw new InternalServerErrorException('user not found')
      }
      const deleted  = await this.userRepository.remove(user)
      return deleted
    } catch (error) {
      throw new InternalServerErrorException('error deleting user')
    }
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User or password incorrect.');
    }else{
      const isPasswordMatch = await comparePass(password, user.password) // Compara a senha fornecida com o hash armazenado no banco de dados
      if (!isPasswordMatch) {
        throw new UnauthorizedException('User or password incorrect.');
      }
      return user;
    }
    
  }

}
