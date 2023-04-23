import { Test, TestingModule } from '@nestjs/testing';
import { BuyTicketsService } from './buy_tickets.service';

describe('BuyTicketsService', () => {
  let service: BuyTicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyTicketsService],
    }).compile();

    service = module.get<BuyTicketsService>(BuyTicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
