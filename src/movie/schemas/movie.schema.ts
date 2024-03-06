import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genre } from '../interfaces/genres';

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: number;

  @Prop()
  voteAverage: number;

  @Prop()
  voteCount: number;

  @Prop()
  releaseDate: string;

  @Prop()
  genres: Genre[];

  @Prop({ unique: true, required: true })
  movieId: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
