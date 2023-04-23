import { Test, TestingModule } from '@nestjs/testing';
import { OrganizerCategoryService } from './organizer_category.service';

describe('OrganizerCategoryService', () => {
  let service: OrganizerCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizerCategoryService],
    }).compile();

    service = module.get<OrganizerCategoryService>(OrganizerCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
