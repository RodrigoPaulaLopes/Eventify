import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../../entities/tickets/tickets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) { }

  async findAll(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find({ relations: ['event'] });
    } catch (error) {
      throw new Error('Error finding tickets');
    }
  }

  async findById(id: number): Promise<Ticket> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id: id }, relations: ['event'] });
      if (!ticket) {
        throw new Error(`Ticket with id ${id} not found`);
      }
      return ticket;
    } catch (error) {
      throw new Error('Error finding ticket');
    }
  }

  async create(ticket: Ticket): Promise<Ticket> {
    try {
      return await this.ticketRepository.save(ticket);
    } catch (error) {
      throw new Error('Error creating ticket');
    }
  }

  async update(id: number, ticket: Ticket): Promise<Ticket> {
    try {
      await this.ticketRepository.update(id, ticket);
      const updatedTicket = await this.ticketRepository.findOne({ where: { id: id }, relations: ['event'] });
      if (!updatedTicket) {
        throw new Error(`Ticket with id ${id} not found`);
      }
      return updatedTicket;
    } catch (error) {
      throw new Error('Error updating ticket');
    }
  }

  async delete(id: number): Promise<Ticket> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id: id }, relations: ['event'] });

      if (!ticket) throw new Error(`Ticket with id ${id} not found`);
      
      const deleted = await this.ticketRepository.remove(ticket);

      return deleted

    } catch (error) {
      throw new Error('Error deleting ticket');
    }
  }
}
