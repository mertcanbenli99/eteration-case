import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
import { randomInt } from 'crypto';

describe('Movies Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let movieDummy;
  let responseLength;

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
      .expect(
        '{"message":"Cannot GET /","error":"Not Found","statusCode":404}',
      );
  });

  const movie = {
    original_title: '12 Angry Man',
    id: randomInt(10000),
  };
  describe('Movie', () => {
    it('(POST) - create a new movie', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send(movie)
        .expect(201)
        .then((res) => {
          expect(res.body._id && res.body.movieId).toBeDefined();
          movieDummy = res.body;
        });
    });

    it('(GET)- find all movies', async () => {
      return request(app.getHttpServer())
        .get('/movie')
        .expect(200)
        .then((res) => {
          expect(res.body).not.toEqual([]);
          responseLength = res.body.length;
        });
    });
    it('(GET:id)- find movie by id', async () => {
      return request(app.getHttpServer())
        .get(`/movie/${movieDummy._id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body._id).toEqual(movieDummy._id);
        });
    });
    it('(DELETE:id)- remove movie by id', async () => {
      let length = await request(app.getHttpServer())
        .get('/movie')
        .then((res) => {
          return res.body.length;
        });

      request(app.getHttpServer())
        .delete(`/movie/${movieDummy._id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
      return request(app.getHttpServer())
        .get('/movie')
        .then((res) => {
          expect(res.body.length).toEqual(length - 1);
        });
    });
  });
});
