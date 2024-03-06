import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';
import { TmdbModule } from 'src/tmdb/tmdb.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    TmdbModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
