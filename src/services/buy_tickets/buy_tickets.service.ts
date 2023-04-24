import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyTickets } from '../../entities/buy_tickets/buy_tickets.entity';
import { Repository } from 'typeorm';
import { Ticket } from 'src/entities/tickets/tickets.entity';

@Injectable()
export class BuyTicketsService {
  constructor(
    @InjectRepository(BuyTickets)
    private buyTicketsRepository: Repository<BuyTickets>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) { }

  async findAll(): Promise<BuyTickets[]> {
    return this.buyTicketsRepository.find({ relations: ['user', 'ticket'] });
  }

  async findById(id: number): Promise<BuyTickets> {
    return this.buyTicketsRepository.findOne({ where: { id: id }, relations: ['user', 'ticket'] });
  }
  async findByUserId(id: number): Promise<BuyTickets[]> {
    return this.buyTicketsRepository.find({ where: { user: { id: id } }, relations: ['user', 'ticket'] });
  }
  async findByTicketId(id: number): Promise<BuyTickets[]> {
    return this.buyTicketsRepository.find({ where: { ticket: { id: id } }, relations: ['user', 'ticket'] });
  }

  async buyTickets(buyTickets: BuyTickets): Promise<BuyTickets> {
    try {
      const idTicket: number = buyTickets.ticket.id;
      const tickets = await this.ticketsRepository.findOne({ where: { id: idTicket } });
      
      if(!tickets){
        throw new Error("tickets not found");
      }
      if(tickets.quantity == 0){
        throw new Error("There are no tickets available for this event");
      } 
  
      if(buyTickets.quantity == 0){
        throw new Error("Quantity of tickets must be greater than zero");
      }
  
      const new_tickets = { ...tickets, quantity: tickets.quantity - buyTickets.quantity };
      const updated = await this.ticketsRepository.update(idTicket, new_tickets);
  
      if(updated.affected !== 1){ 
        throw new Error("Failed to update ticket quantity");
      }
  
      const new_buy_tickets: BuyTickets = {...buyTickets, buyDate: new Date(), amount: buyTickets.quantity * tickets.value};
      const buy_tickets = await this.buyTicketsRepository.save(new_buy_tickets);
  
      return buy_tickets;
    } catch(error) {
      throw new Error(error.message);
    }
  }
  async cancelPurchase(id: number): Promise<any> {
    try {
      const purchase = await this.buyTicketsRepository.findOne({ where: { id: id }, relations: ['ticket'] })
  
      if (!purchase) {
        return { error: 'Purchase not found' }
      }
  
      const idTicket = purchase.ticket.id
      const tickets = await this.ticketsRepository.findOne({ where: { id: idTicket } })
  
      if (!tickets) {
        return { error: 'Ticket not found' }
      }
  
      const new_tickets = { ...tickets, quantity: tickets.quantity + purchase.quantity }
      await this.ticketsRepository.update(idTicket, new_tickets)
  
      await this.buyTicketsRepository.delete(id)
  
      return { message: 'Purchase successfully canceled' }
    } catch (error) {
      console.error(error)
      return { error: 'Unexpected error' }
    }
  }

  async delete(id: number): Promise<void> {
    await this.buyTicketsRepository.delete(id);
  }
}
