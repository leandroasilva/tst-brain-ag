import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import type { MockProxy } from 'jest-mock-extended';
import { mock } from 'jest-mock-extended';
import { AppModule } from '../../src/app.module';
import { RuralProducerService } from 'src/app/rural-producer/rural-producer.service';

describe('RuralProducerController (e2e)', () => {
  let app: INestApplication;
  let ruralProducerService: MockProxy<RuralProducerService>;

  beforeAll(async () => {
    ruralProducerService = mock<RuralProducerService>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RuralProducerService)
      .useValue(ruralProducerService)
      .compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
  
  afterAll(async () => {
    await app.close();
  });
});
