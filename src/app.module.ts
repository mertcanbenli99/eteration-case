import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { TmdbModule } from './tmdb/tmdb.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost:27017/eteration-case'),
    MovieModule,
    TmdbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
