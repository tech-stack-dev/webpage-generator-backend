import { Test, TestingModule } from '@nestjs/testing';
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
import { GeneratePageDto } from '../dto/create-generated-page.dto';
// ---------------------

describe('GeneratedPageService', () => {
  let service: GeneratedPageService;

  const mockGeneratePageData: GeneratePageDto = {
    serviceType: 'Linux',
    basePage: 'None',
    structurePage: 'None',
    minTextSize: 12,
    keywords: 'Keyword1,Keyword2',
    metaTitle: 'Meta Title',
    metaDescription: 'Meta Description',
    breadcrumb: 'breadcrumb',
    geo: 'Kyiv',
    slug: 'some-slug-value',
    mainContentPrompts: ['OnePrompt', 'TwoPrompts'],
    heroContentPrompts: ['OneHeroContentPrompt', 'TwoHeroContentPrompt'],
    heroSectionTitle: 'Hero Content Title',
  };

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

  describe('replaceVariables', () => {
    it('should match all placeholders and replace them with actual provided value', () => {
      const incomingTemplate1 = `%metaDescription% of some %metaTitle%. [%keywords%]. I am %slug%.
          I am located at %geo%. %serviceType% is a theme of this article. %heroSectionTitle% is my passion.
          What is the meaning of life anyway?
          `;
      const expectedProcessedString1 = `${mockGeneratePageData.metaDescription} of some ${mockGeneratePageData.metaTitle}. [${mockGeneratePageData.keywords}]. I am ${mockGeneratePageData.slug}.
          I am located at ${mockGeneratePageData.geo}. ${mockGeneratePageData.serviceType} is a theme of this article. ${mockGeneratePageData.heroSectionTitle} is my passion.
          What is the meaning of life anyway?
          `;

      const result1 = service.replaceVariables(
        incomingTemplate1,
        mockGeneratePageData,
      );

      expect(result1).toEqual(expectedProcessedString1);

      const incomingTemplate2 = `%metaDescription% of some %metaTitle%. [%keywords%]. I am %slug%.
          I am located at %geo%. %serviceType% is a theme of this article, %serviceType%. %heroSectionTitle% is my passion.
          What is the meaning of life anyway [%keywords%]?
          `;
      const expectedProcessedString2 = `${mockGeneratePageData.metaDescription} of some ${mockGeneratePageData.metaTitle}. [${mockGeneratePageData.keywords}]. I am ${mockGeneratePageData.slug}.
          I am located at ${mockGeneratePageData.geo}. ${mockGeneratePageData.serviceType} is a theme of this article, ${mockGeneratePageData.serviceType}. ${mockGeneratePageData.heroSectionTitle} is my passion.
          What is the meaning of life anyway [${mockGeneratePageData.keywords}]?
          `;

      const result2 = service.replaceVariables(
        incomingTemplate2,
        mockGeneratePageData,
      );

      expect(result2).toEqual(expectedProcessedString2);
    });
  });
});
