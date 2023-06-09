import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyTickets } from './entities/buy_tickets.entity';
import { Repository } from 'typeorm';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { CreateBuyTicketDto } from './dto/create-buy_ticket.dto';
import { User } from 'src/users/entities/users.entity';
import { async } from 'rxjs';

@Injectable()
export class BuyTicketsService {
  constructor(
    @InjectRepository(BuyTickets)
    private buyTicketsRepository: Repository<BuyTickets>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(userId: number): Promise<BuyTickets[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')
    const buy_tickets = await this.buyTicketsRepository.find({ relations: ['user', 'ticket'] });

    if (!buy_tickets) {
      throw new NotFoundException('buy tickets is empty')
    }

    return buy_tickets

  }

  async findById(id: number, userId: number): Promise<BuyTickets> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    const buy_ticket = await this.buyTicketsRepository.findOne({ where: { id: id }, relations: ['user', 'ticket'] });

    if (!buy_ticket) {
      throw new NotFoundException('buy ticket not found!');
    }
    return buy_ticket

  }
  async findByUserId(id: number, userId: number): Promise<BuyTickets[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')

    const buy_ticket = await this.buyTicketsRepository.find({ where: { user: { id: id } }, relations: ['user', 'ticket'] });

    if (!buy_ticket) {
      throw new NotFoundException('buy ticket with id user not found!');
    }
    return buy_ticket
  }
  async findByTicketId(id: number, userId: number): Promise<BuyTickets[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')
    const buy_ticket = await this.buyTicketsRepository.find({ where: { ticket: { id: id } }, relations: ['user', 'ticket'] });

    if (!buy_ticket) {
      throw new NotFoundException('buy ticket not found!');
    }
    return buy_ticket
  }

  async buyTickets(buyTickets: CreateBuyTicketDto, userId: number): Promise<BuyTickets> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')
    const idTicket: number = buyTickets.ticket.id;
    const tickets = await this.ticketsRepository.findOne({ where: { id: idTicket } });

    if (!tickets) {
      throw new NotFoundException("tickets not found");
    }
    if (tickets.quantity == 0) {
      throw new NotFoundException("There are no tickets available for this event");
    }

    if (buyTickets.quantity == 0) {
      throw new BadRequestException("Quantity of tickets must be greater than zero");
    }

    tickets.quantity -= buyTickets.quantity; // Atualiza a quantidade de tickets no objeto original

    const updated = await this.ticketsRepository.update(idTicket, tickets);

    if (updated.affected !== 1) {
      throw new Error("Failed to update ticket quantity");
    }

    const new_buy_tickets: CreateBuyTicketDto = { ...buyTickets, buyDate: new Date(), amount: buyTickets.quantity * tickets.value };
    const buy_tickets = await this.buyTicketsRepository.save(new_buy_tickets);

    return buy_tickets;
  }

  async cancelPurchase(id: number, userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (user == null) throw new NotFoundException('user not found')

    if (user.isAdmin != true) throw new BadRequestException('user is not admin')
    const purchase = await this.buyTicketsRepository.findOne({ where: { id: id }, relations: ['ticket'] })

    if (!purchase) {
      throw new NotFoundException('Purchase not found')
    }

    const idTicket = purchase.ticket.id
    const tickets = await this.ticketsRepository.findOne({ where: { id: idTicket } })

    if (!tickets) {
      throw new NotFoundException('Ticket not found')
    }

    const new_tickets = { ...tickets, quantity: tickets.quantity + purchase.quantity }
    await this.ticketsRepository.update(idTicket, new_tickets)

    await this.buyTicketsRepository.delete(id)

    return { message: 'Purchase successfully canceled' }

  }

  async delete(id: number): Promise<BuyTickets> {
    try {
      const buy_ticket = await this.buyTicketsRepository.findOne({ where: { id: id } })
      if (!buy_ticket) {
        throw new Error("buy ticket not found");

      }
      const removed = await this.buyTicketsRepository.remove(buy_ticket);
      return removed
    } catch (error) {
      throw new Error(error.message);

    }

  }
}
