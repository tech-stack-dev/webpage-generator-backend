import { Test, TestingModule } from '@nestjs/testing';
import { GeneratedPageController } from '../generated-page.controller';
import { GeneratedPageService } from '../generated-page.service';
import { OpenaiService } from '../../openai/openai.service';

// NOTE: mocking OpenAI service
// ---------------------
jest.mock('openai', () => {
  return {
    // NOTE: this shenanigan is here, because jest doesn't work well with ESModules (import smth from "./path"), especially
    // if "default imports" like here are present.
    // Thus we:
    // 1. Specify that this is and ESModule
    __esModule: true, // 👈 Important to preserve "default" export
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

describe('GeneratedPageController', () => {
  let controller: GeneratedPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneratedPageController],
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

    controller = module.get<GeneratedPageController>(GeneratedPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
