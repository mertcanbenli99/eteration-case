import { getModelToken } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Test } from '@nestjs/testing';
import { Movie } from './schemas/movie.schema';
import mongoose, { Model } from 'mongoose';
import { TmdbService } from '../tmdb/tmdb.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MovieService', () => {
  let movieService: MovieService;
  let model: Model<Movie>;

  const mockMovie = {
    _id: '65e85cca5b148680635b62d3',
    name: 'Pulp Fiction',
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    popularity: 94.503,
    voteAverage: 8.489,
    voteCount: 26742,
    releaseDate: '1994-09-10',
    genres: [
      {
        id: 53,
        name: 'Thriller',
      },
      {
        id: 80,
        name: 'Crime',
      },
    ],
    movieId: 680,
    id: 'c17f39ab-86ae-4ade-ac76-c5150f826352',
    __v: 0,
  };
  const mockMovieService = {
    findById: jest.fn(),
    findOne: jest.fn(),
  };
  const mockTmdbService = {
    getMovies: jest.fn(),
    getMovieDetails: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieService,
        },

        {
          provide: TmdbService,
          useValue: mockTmdbService,
        },
      ],
    }).compile();

    movieService = moduleRef.get<MovieService>(MovieService);
    model = moduleRef.get<Model<Movie>>(getModelToken(Movie.name));
  });

  // FindById
  describe('findById', () => {
    it('should find and return a book by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockMovie);
      const result = await movieService.findById(mockMovie._id);
      expect(model.findById).toHaveBeenCalledWith(mockMovie._id);
      expect(result).toEqual(mockMovie);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'gibberish-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);
      await expect(movieService.findById(id)).rejects.toThrow(
        BadRequestException,
      );

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });
    it('should throw NotFoundException if resource is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);
      await expect(movieService.findById(mockMovie._id)).rejects.toThrow(
        NotFoundException,
      );
      expect(model.findById).toHaveBeenCalledWith(mockMovie._id);
    });
  });
});

// FindAllMovies
describe('findAll', () => {});
