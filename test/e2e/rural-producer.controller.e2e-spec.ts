import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import type { MockProxy } from 'jest-mock-extended';
import { mock } from 'jest-mock-extended';
import { AppModule } from '../../src/app.module';
import { RuralProducerService } from 'src/app/rural-producer/rural-producer.service';
import request from 'supertest';
import { generateRuralProducerGenerator } from 'test/generators/rural-producer';
import { generateUUID } from 'test/helpers';

describe('RuralProducerController (e2e)', () => {
  let app: INestApplication;
  let ruralProducerService: MockProxy<RuralProducerService>;

  beforeAll(async () => {
    ruralProducerService = mock<RuralProducerService>({
      createRuralProducer: jest.fn().mockImplementation(async (payload) => ({
        id: generateUUID(),
        ...payload,
      })),
      updateRuralProducer: jest
        .fn()
        .mockImplementation(async (id, payload) => ({
          id,
          ...payload,
        })),
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RuralProducerService)
      .useValue(ruralProducerService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/rural-producers', () => {
    it('should return success when create a new rural producer', async () => {
      const generatedRuralProducer = generateRuralProducerGenerator();

      const response = await request(app.getHttpServer())
        .post('/v1/rural-producers')
        .send(generatedRuralProducer)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        id: expect.any(String),
        ...generatedRuralProducer,
      });
    });

    it('should return success when update a rural producer', async () => {
      const generatedRuralProducer = generateRuralProducerGenerator();
      const id = generateUUID();

      const response = await request(app.getHttpServer())
        .put(`/v1/rural-producers/${id}`)
        .send(generatedRuralProducer)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({
        id,
        ...generatedRuralProducer,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
