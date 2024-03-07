import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiBody({ type: CreateMovieDto })
  @ApiOperation({ summary: 'Create a Movie' })
  @ApiResponse({
    status: 201,
    description: 'The movies has been successfully saved',
  })
  async save(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.save(createMovieDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Successfully fetched and persisted movies from Tmdb',
  })
  @ApiOperation({ summary: 'Fetch and Save netflix moviies from tmdb' })
  @Get('fetch')
  fetchMovies() {
    return this.movieService.fetchAndPersistMovies();
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all movies' })
  @ApiOperation({ summary: 'Returns all movie records' })
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the movie with specified id',
  })
  @ApiOperation({ summary: 'Finds and returns a movie by id' })
  async findById(@Param('id') id: string) {
    return await this.movieService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Removes the movie with specified id',
  })
  @ApiOperation({ summary: 'Removes specified movie by id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieService.removeById(id);
  }
}
