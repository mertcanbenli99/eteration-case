import { Module } from '@nestjs/common';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule} from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot(),
     HttpModule, MongooseModule.forRoot('mongodb://localhost:27017/eteration-case'), MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
