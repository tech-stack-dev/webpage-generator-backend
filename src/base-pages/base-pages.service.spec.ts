import { Test, TestingModule } from '@nestjs/testing';
import { BasePagesService } from './base-pages.service';

describe('BasePagesService', () => {
  let service: BasePagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasePagesService],
    }).compile();

    service = module.get<BasePagesService>(BasePagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
