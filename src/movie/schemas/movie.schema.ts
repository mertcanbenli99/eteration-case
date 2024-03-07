import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genre } from '../interfaces/genres';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'netflix.movies' })
export class Movie {
  @Prop({ default: uuidv4 })
  id?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  overview?: string;

  @Prop()
  popularity?: number;

  @Prop()
  voteAverage?: number;

  @Prop()
  voteCount?: number;

  @Prop()
  releaseDate?: string;

  @Prop()
  genres?: Genre[];

  @Prop({ unique: true, required: true })
  movieId: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
