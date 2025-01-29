import { Test, TestingModule } from '@nestjs/testing';
import { GeneratedPageController } from './generated-page.controller';
import { GeneratedPageService } from './generated-page.service';

describe('GeneratedPageController', () => {
  let controller: GeneratedPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneratedPageController],
      providers: [GeneratedPageService],
    }).compile();

    controller = module.get<GeneratedPageController>(GeneratedPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
