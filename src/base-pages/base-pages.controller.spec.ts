import { Test, TestingModule } from '@nestjs/testing';
import { BasePagesController } from './base-pages.controller';
import { BasePagesService } from './base-pages.service';

describe('BasePagesController', () => {
  let controller: BasePagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasePagesController],
      providers: [BasePagesService],
    }).compile();

    controller = module.get<BasePagesController>(BasePagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
