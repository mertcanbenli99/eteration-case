import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Genre } from "../interfaces/genres";



export class CreateMovieDto {

    @IsNotEmpty()
    @IsString()
    original_title: string

    @IsNotEmpty()
    @IsString()
    overview: string

    @IsNotEmpty()
    @IsNumber()
    popularity: number

    @IsNotEmpty()
    @IsNumber()
    vote_average: number

    @IsNotEmpty()
    @IsNumber()
    vote_count: number

    @IsNotEmpty()
    @IsString()
    release_date: string

    @IsNotEmpty()
    genres: Genre[]
}
