import {Prop,  Schema,  SchemaFactory} from "@nestjs/mongoose"
import { CreateMovieDto } from "../dto/create-movie.dto";


export interface Genre {
    id: number;
    name: string;
}


@Schema()
export class Movie   {
    
    @Prop({required: true})
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
    genres: Genre[]

 
}



export const MovieSchema = SchemaFactory.createForClass(Movie)
