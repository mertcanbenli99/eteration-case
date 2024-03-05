import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';


@Injectable()
export class MovieService {

  constructor(private httpService: HttpService, private configService: ConfigService) {}
  
  async fetchMoviesTmdb() {
    try {
      const response =  await lastValueFrom(this.httpService.get('https://api.themoviedb.org/3/discover/movie?api_key=ebb7c95eee29a5e273ddcb68dc12b372&sort_by=release_date.asc&vote_count.gte=1500&vote_average.gte=8.4&watch_region=TR&with_watch_providers=8'));
      return response.data;
    } catch (error) {
      console.error(error)
    }
    
    
     
  }

  save(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
