import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Genre } from '../interfaces/genres';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'Apocalypse Now',
  })
  @IsNotEmpty()
  @IsString()
  original_title: string;

  @ApiProperty({
    description: 'Summary of the movie',
    example: 'Mind-bending thriller',
  })
  @IsNotEmpty()
  @IsString()
  overview: string;

  @IsNotEmpty()
  @IsNumber()
  popularity: number;

  @IsNotEmpty()
  @IsNumber()
  vote_average: number;

  @IsNotEmpty()
  @IsNumber()
  vote_count: number;

  @IsNotEmpty()
  @IsString()
  release_date: string;

  @IsNotEmpty()
  genres: Genre[];

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
