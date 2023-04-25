import { PartialType } from '@nestjs/swagger';
import { CreateBuyTicketDto } from './create-buy_ticket.dto';

export class UpdateBuyTicketDto extends PartialType(CreateBuyTicketDto) {}
