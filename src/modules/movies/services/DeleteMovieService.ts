import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IMoviesRepository } from '../domain/repositories/IMoviesRepository';
import { IDeleteMovie } from '../domain/models/IDeleteMovie';

@injectable()
class DeleteMovieService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    public async execute({ id }: IDeleteMovie): Promise<void> {
        const movie = await this.moviesRepository.findById(id);

        if (!movie) {
            throw new AppError('Movie not found.');
        }

        await this.moviesRepository.remove(movie);
    }
}

export default DeleteMovieService;
