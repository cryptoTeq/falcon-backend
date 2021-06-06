import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe('Users', () => {
  const usersService = { findAll: () => ['test'] };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect({
      ok: true,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
