import { Test, TestingModule } from '@nestjs/testing';
import { OrganizerCategoryController } from './organizer_category.controller';

describe('OrganizerCategoryController', () => {
  let controller: OrganizerCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizerCategoryController],
    }).compile();

    controller = module.get<OrganizerCategoryController>(OrganizerCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
