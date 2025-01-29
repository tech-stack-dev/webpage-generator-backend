import { Test, TestingModule } from '@nestjs/testing';
import { GeneratedPageService } from './generated-page.service';

describe('GeneratedPageService', () => {
  let service: GeneratedPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratedPageService],
    }).compile();

    service = module.get<GeneratedPageService>(GeneratedPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
