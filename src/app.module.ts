import { Module } from '@nestjs/common';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';


@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class AppModule {}
