import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';

@Injectable()
export class TmdbService {
  constructor(private httpService: HttpService) {}

  async getMovies(): Promise<CreateMovieDto[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: 'ebb7c95eee29a5e273ddcb68dc12b372',
            sort_by: 'release_date.asc',
            'vote_count.gte': 1500,
            'vote_average.gte': 8.4,
            watch_region: 'TR',
            with_watch_providers: '8',
          },
        }),
      );
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  }
}
