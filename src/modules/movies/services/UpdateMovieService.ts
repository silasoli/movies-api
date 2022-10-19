import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IMoviesRepository } from '../domain/repositories/IMoviesRepository';
import { IUpdateMovie } from '../domain/models/IUpdateMovie';
import Movie from '../infra/typeorm/entities/Movie';

@injectable()
class UpdateMovieService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    public async execute({
        id,
        title,
        poster,
        release_year,
        genres,
        imdb,
    }: IUpdateMovie): Promise<Movie> {
        const movie = await this.moviesRepository.findById(id);

        if (!movie) {
            throw new AppError('Movie not found.');
        }

        // const movieExists = await this.moviesRepository.findByEmail(
        //     email,
        // );

        // if (movieExists && email !== movie.email) {
        //     throw new AppError(
        //         'There is already one movie with this email.',
        //     );
        // }

        movie.title = title;
        movie.poster = poster;
        movie.release_year = release_year;
        movie.genres = genres;
        movie.imdb = imdb;

        return this.moviesRepository.save(movie);
    }
}

export default UpdateMovieService;
