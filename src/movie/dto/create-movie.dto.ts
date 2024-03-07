import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Genre } from '../interfaces/genres';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

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
  @IsString()
  overview?: string;

  @IsNumber()
  @IsOptional()
  popularity?: number;

  @IsNumber()
  @IsOptional()
  vote_average?: number;

  @IsNumber()
  @IsOptional()
  vote_count?: number;

  @IsString()
  @IsOptional()
  release_date?: string;

  genres?: Genre[];

  @ApiProperty({
    description: ' Corresponds to id of movie from tmdb',
    example: 442,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
