import { Test, TestingModule } from '@nestjs/testing';
import { BuyTicketsController } from './buy_tickets.controller';

describe('BuyTicketsController', () => {
  let controller: BuyTicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyTicketsController],
    }).compile();

    controller = module.get<BuyTicketsController>(BuyTicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
