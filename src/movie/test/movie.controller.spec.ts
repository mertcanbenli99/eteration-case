import { MovieController } from '../movie.controller';
import { MovieService } from '../movie.service';
import { Test } from '@nestjs/testing';
import { CreateMovieDto } from '../dto/create-movie.dto';

describe('MovieController', () => {
  let movieService: MovieService;
  let movieController: MovieController;

  const mockMovie = {
    _id: '65e8ea82adbfb039d463faa1',
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
    movieId: 5432,
    id: 'c17f39ab-86ae-4ade-ac76-c5150f826352',
    __v: 0,
  };
  const mockMovieService = {
    findAll: jest.fn().mockResolvedValueOnce([mockMovie, mockMovie, mockMovie]),
    save: jest.fn(),
    findById: jest.fn().mockResolvedValueOnce(mockMovie),
    removeById: jest.fn().mockResolvedValueOnce({ deleted: true }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    movieService = moduleRef.get<MovieService>(MovieService);
    movieController = moduleRef.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
  });

  describe('findAllMovies', () => {
    it('should get all movies', async () => {
      const result = await movieController.findAll();

      expect(movieService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockMovie, mockMovie, mockMovie]);
    });
  });

  describe('create a movie', () => {
    it('create a movie', async () => {
      const newMovie: CreateMovieDto = {
        original_title: 'Apocalypse Now',
        overview: 'Thrilling',
        popularity: 5,
        release_date: '28-09-1999',
        vote_average: 7,
        vote_count: 1500,
        id: 5432,
        genres: [{ id: 1, name: 'aaa' }],
      };

      mockMovieService.save = jest.fn().mockResolvedValueOnce(mockMovie);
      const result = await movieController.save(newMovie as CreateMovieDto);
      expect(movieService.save).toHaveBeenCalled();
      expect(result).toEqual(mockMovie);
    });
  });

  describe('findMovieById', () => {
    it('should get a specific movie with Id', async () => {
      const result = await movieController.findById(mockMovie._id);

      expect(movieService.findById).toHaveBeenCalledWith(mockMovie._id);
      expect(result).toEqual(mockMovie);
    });
  });

  describe('removeMovieById', () => {
    it('should delete a specific movie with Id', async () => {
      const result = await movieController.remove(mockMovie._id);

      expect(movieService.removeById).toHaveBeenCalledWith(mockMovie._id);
      expect(result).toEqual({ deleted: true });
    });
  });
});
