import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { TmdbOptions, defaultOptions } from 'src/tmdb/interfaces/tmdb.options';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';

@Injectable()
export class TmdbService {
  constructor(private httpService: HttpService) {}

  async getMovies(options = defaultOptions): Promise<CreateMovieDto[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: 'ebb7c95eee29a5e273ddcb68dc12b372',
            ...options,
          },
        }),
      );
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async getMovieDetails(movieId: number): Promise<CreateMovieDto> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: 'ebb7c95eee29a5e273ddcb68dc12b372',
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
