import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuyTickets } from 'src/buy_tickets/entities/buy_tickets.entity';
import { BuyTicketsService } from 'src/buy_tickets/buy_tickets.service';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiParam, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateBuyTicketDto } from './dto/create-buy_ticket.dto';
import { Ticket } from 'src/tickets/entities/tickets.entity';
@ApiBearerAuth()
@ApiTags('buy_tickets')
@Controller('buy-tickets')
export class BuyTicketsController {
  constructor(private readonly buyTicketsService: BuyTicketsService) { }

  @Get(':userId')
  @ApiOperation({ summary: 'Listar todas as compras de tickets.' })
  @ApiOkResponse({ description: 'Compras de tickets listadas com sucesso.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiUnauthorizedResponse({ description: "precisa de um token de acesso." })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'ID do usuario admin',
  })
  findAll(@Param('userId') userId: number) {
    return this.buyTicketsService.findAll(userId);
  }

  @Get(':id/:userId')
  @ApiOperation({ summary: 'Listar compras de tickets pelo id.' })
  @ApiNotFoundResponse({ description: 'Compra de ticket não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiUnauthorizedResponse({ description: "precisa de um token de acesso." })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID da compra do ticket a ser procurado',
  })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'ID do usuario admin',
  })
  findOne(@Param('id') id: number, @Param('userId') userId: number): Promise<any> {
    return this.buyTicketsService.findById(id, userId);
  }
  @Get('user/:id/:userId')
  @ApiOperation({ summary: 'Listar compras de tickets pelo id do usuario.' })
  @ApiNotFoundResponse({ description: 'Compra de ticket buscado pelo id do usuario não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiUnauthorizedResponse({ description: "precisa de um token de acesso." })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID do usuario a ser procurado',
  })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'ID do usuario admin',
  })
  findByUserId(@Param('id') id: number, @Param('userId') userId: number): Promise<any> {
    return this.buyTicketsService.findByUserId(id, userId);
  }
  @Get('ticket/:id/:userId')
  @ApiOperation({ summary: 'Listar compras de tickets pelo id do ticket.' })
  @ApiNotFoundResponse({ description: 'Compra de ticket buscado pelo id do ticket não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiUnauthorizedResponse({ description: "precisa de um token de acesso." })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID do ticket a ser procurado',
  })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'ID do usuario admin',
  })
  findByTicketId(@Param('id') id: number, @Param('userId') userId: number): Promise<any> {
    return this.buyTicketsService.findByTicketId(id, userId);
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Comprar tickets.' })
  @ApiCreatedResponse({ description: 'O ticket foi comprado com sucesso', type: Ticket })
  @ApiBadRequestResponse({ description: 'Dados inválidos para comprar um tickets.' })
  @ApiNotFoundResponse({ description: 'Tickets não encontrados.' })
  @ApiNotFoundResponse({ description: 'Tickets esgotados.' })
  @ApiBadRequestResponse({ description: 'numero de tickets para ser comprado deve ser maior que zero.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiUnauthorizedResponse({ description: "precisa de um token de acesso." })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'ID do usuario admin',
  })
  buyTickets(@Body() buyTickets: CreateBuyTicketDto, @Param('userId') userId: number) {
    return this.buyTicketsService.buyTickets(buyTickets, userId);
  }
  @Put(':id/:userId')
  @ApiOperation({ summary: 'Cancelar compra de tickets.' })
  @ApiCreatedResponse({ description: 'A compra do tickets foi cancelada com sucesso', type: Ticket })
  @ApiBadRequestResponse({ description: 'Dados inválidos para cancelar um tickets.' })
  @ApiNotFoundResponse({ description: 'Compra de tickets não encontrados.' })
  @ApiNotFoundResponse({ description: 'Tickets não encontrados.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiUnauthorizedResponse({ description: "precisa de um token de acesso." })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID da compra do ticket a ser procurado',
  })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'ID do usuario admin',
  })
  cancelPurchase(@Param('id') id: number, @Param('userId') userId: number): Promise<BuyTickets> {
    return this.buyTicketsService.cancelPurchase(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'remover compra de tickets.' })
  @ApiOkResponse({ description: 'A compra de tickets foi excluída com sucesso', type: Ticket })
  @ApiNotFoundResponse({ description: 'Compra de tickets não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiUnauthorizedResponse({ description: "precisa de um token de acesso." })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID da compra do ticket a ser deletado',
  })
  @ApiParam({
    name: 'userId',
    type: 'integer',
    description: 'ID do usuario admin',
  })
  remove(@Param('id') id: number) {
    return this.buyTicketsService.delete(id);
  }
}
