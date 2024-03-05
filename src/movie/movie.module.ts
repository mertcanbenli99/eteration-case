import {  Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';


@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
