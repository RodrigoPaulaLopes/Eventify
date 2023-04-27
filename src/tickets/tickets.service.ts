import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { User } from 'src/users/entities/users.entity';
import { create } from 'domain';
import { async } from 'rxjs';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async findAll(userId: number): Promise<Ticket[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')
    return await this.ticketRepository.find({ relations: ['event'] });

  }

  async findById(id: number, userId: number): Promise<Ticket> {

    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    const ticket = await this.ticketRepository.findOne({ where: { id: id }, relations: ['event'] });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;

  }

  async create(ticket: CreateTicketDto, userId: number): Promise<Ticket> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    return await this.ticketRepository.save(ticket);

  }

  async update(id: number, ticket: CreateTicketDto, userId: number): Promise<Ticket> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    await this.ticketRepository.update(id, ticket);

    const updatedTicket = await this.ticketRepository.findOne({ where: { id: id }, relations: ['event'] });

    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return updatedTicket;

}

  async delete (id: number, userId: number): Promise < Ticket > {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    const ticket = await this.ticketRepository.findOne({ where: { id: id }, relations: ['event'] });

    if(!ticket) throw new NotFoundException(`Ticket with id ${id} not found`);

    const deleted = await this.ticketRepository.remove(ticket);

    return deleted

  
}
}
