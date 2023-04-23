import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './tickets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>,
      ) {}
    
      async findAll(): Promise<Ticket[]> {
        return this.ticketRepository.find({ relations: ['event'] });
      }
    
      async findById(id: number): Promise<Ticket> {
        return this.ticketRepository.findOne({where: {id: id},  relations: ['event'] });
      }
    
      async create(ticket: Ticket): Promise<Ticket> {
        return this.ticketRepository.save(ticket);
      }
    
      async update(id: number, ticket: Ticket): Promise<Ticket> {
        await this.ticketRepository.update(id, ticket);
        return this.ticketRepository.findOne({where: {id: id},  relations: ['event'] });
      }
    
      async delete(id: number): Promise<void> {
        await this.ticketRepository.delete(id);
      }
}
