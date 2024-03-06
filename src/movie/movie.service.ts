import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { TmdbService } from 'src/tmdb/tmdb.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    private tmdbService: TmdbService,
  ) {}

  async save(createMovieDto: CreateMovieDto): Promise<Movie> {
    const dto = this.mapCreateMovieDtoToEntity(createMovieDto);
    const newMovie = await this.movieModel.create(dto);
    return newMovie;
  }

  async fetchAndPersistMovies(): Promise<CreateMovieDto[]> {
    const movies = await this.tmdbService.getMovies();

    for (const movie of movies) {
      const response = await this.tmdbService.getMovieDetails(movie.id);
      if (!response) {
        throw new BadRequestException();
      }

      await this.save(response);
    }
    return movies;
  }

  async findAll() {
    return await this.movieModel.find();
  }

  async findById(id: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) {
      throw new BadRequestException();
    }
    return await this.movieModel.findById({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  mapCreateMovieDtoToEntity = (createMovieDto: CreateMovieDto): Movie => {
    const dto = {
      name: createMovieDto.original_title,
      overview: createMovieDto.overview,
      popularity: createMovieDto.popularity,
      voteAverage: createMovieDto.vote_average,
      voteCount: createMovieDto.vote_count,
      releaseDate: createMovieDto.release_date,
      genres: createMovieDto.genres,
      movieId: createMovieDto.id,
    };
    return dto;
  };
}
