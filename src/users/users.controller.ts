import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
@ApiBearerAuth()
@ApiTags('users')
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
  
    @Put(':id')
    update(@Param('id') id: number, @Body() user: CreateUserDto): Promise<User> {
      return this.userService.update(id, user);
    }
  
    @Delete(':id')
    delete(@Param('id') id: number): Promise<User> {
      return this.userService.delete(id);
    }
  
    
}
function AuthGuard(): Function | import("@nestjs/common").CanActivate {
  throw new Error('Function not implemented.');
}

