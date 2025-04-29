import { Test, TestingModule } from '@nestjs/testing';
import { GeneratedPageService } from '../generated-page.service';
import { OpenaiService } from 'src/openai/openai.service';

// NOTE: mocking OpenAI service
// ---------------------
jest.mock('openai', () => {
  return {
    // NOTE: this shenanigan is here, because jest doesn't work well with ESModules (import smth from "./path"), especially
    // if "default imports" like here are present.
    // Thus we:
    // 1. Specify that this is and ESModule
    __esModule: true,
    // 2. Mock default import
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: 'mocked response' } }],
          }),
        },
      },
    })),
  };
});

import OpenAI from 'openai';
// ---------------------

describe('GeneratedPageService', () => {
  let service: GeneratedPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneratedPageService,
        OpenaiService,
        // NOTE: mocking an object returned by call to new OpenAI() constructor.
        {
          provide: OpenAI,
          useClass: OpenAI,
        },
      ],
    }).compile();

    service = module.get<GeneratedPageService>(GeneratedPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
