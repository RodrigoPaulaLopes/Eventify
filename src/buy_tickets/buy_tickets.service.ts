import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyTickets } from './buy_tickets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuyTicketsService {
    constructor(
        @InjectRepository(BuyTickets)
        private buyTicketsRepository: Repository<BuyTickets>,
      ) {}
    
      async findAll(): Promise<BuyTickets[]> {
        return this.buyTicketsRepository.find({ relations: ['user', 'ticket'] });
      }
    
      async findById(id: number): Promise<BuyTickets> {
        return this.buyTicketsRepository.findOne({where: {id: id},  relations: ['user', 'ticket'] });
      }
    
      async create(buyTickets: BuyTickets): Promise<BuyTickets> {
        return this.buyTicketsRepository.save(buyTickets);
      }
    
      async update(id: number, buyTickets: BuyTickets): Promise<BuyTickets> {
        await this.buyTicketsRepository.update(id, buyTickets);
        return this.buyTicketsRepository.findOne({where: {id: id},  relations: ['user', 'ticket'] });
      }
    
      async delete(id: number): Promise<void> {
        await this.buyTicketsRepository.delete(id);
      }
}
