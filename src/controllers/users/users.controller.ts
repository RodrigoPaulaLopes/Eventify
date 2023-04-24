import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../entities/users/users.entity';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findById(@Param('id') id: number): Promise<User> {
      return this.userService.findById(id);
    }
  
    @Post()
    create(@Body() user: User): Promise<User> {
      return this.userService.create(user);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() user: User): Promise<User> {
      return this.userService.update(id, user);
    }
  
    @Delete(':id')
    delete(@Param('id') id: number): Promise<User> {
      return this.userService.delete(id);
    }
  
    @Post('login')
    login(@Body() { email, password }: { email: string; password: string }): Promise<String> {
      return this.userService.login(email, password);
    }
}
