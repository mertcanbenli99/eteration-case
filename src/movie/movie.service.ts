import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';



@Injectable()
export class MovieService {

  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>, private httpService: HttpService) {}
  
  async fetchMoviesTmdb() {
    try {
      const response =  await lastValueFrom(this.httpService.get('https://api.themoviedb.org/3/discover/movie?api_key=ebb7c95eee29a5e273ddcb68dc12b372&sort_by=release_date.asc&vote_count.gte=1500&vote_average.gte=8.4&watch_region=TR&with_watch_providers=8'));
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async save (createMovieDto: CreateMovieDto): Promise<Movie> {
    
    
     const dto = this.mapCreateMovieDtoToEntity(createMovieDto);
    try {
      const newMovie = await this.movieModel.create(dto);
      console.log(newMovie);
      return newMovie;
    } catch (error) {
      console.error('Error creating movie:', error);
    }
    
    

  
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

   mapCreateMovieDtoToEntity = (createMovieDto: CreateMovieDto): Movie => {
    const dto = {
      name: createMovieDto.original_title,
      overview: createMovieDto.overview,
      popularity: createMovieDto.popularity,
      voteAverage: createMovieDto.vote_average,
      voteCount: createMovieDto.vote_count,
      releaseDate: createMovieDto.release_date,
      genres: createMovieDto.genres,
    }
    return dto;

  }
  
}
