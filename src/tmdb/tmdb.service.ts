import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { defaultOptions } from '../tmdb/interfaces/tmdb.options';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  tmdbDiscoverURL = this.configService.get('TMDB_DISCOVER_URL');

  tmdbApiKey = this.configService.get('TMDB_API_KEY');
  tmdbMovieDetailsUrl = this.configService.get<string>(
    'TMDB_MOVIE_DETAILS_URL',
  );

  async getMovies(options = defaultOptions): Promise<CreateMovieDto[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(this.tmdbDiscoverURL, {
          params: {
            api_key: this.tmdbApiKey,
            ...options,
          },
        }),
      );
      return response.data.results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMovieDetails(movieId: number): Promise<CreateMovieDto> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.tmdbMovieDetailsUrl}${movieId}`, {
          params: {
            api_key: this.tmdbApiKey,
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
