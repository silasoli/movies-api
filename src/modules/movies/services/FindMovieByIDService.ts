import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Movie from '../infra/typeorm/entities/Movie';
import { IMoviesRepository } from '../domain/repositories/IMoviesRepository';
import { IFindByIDMovie } from '../domain/models/IFindByIDMovie';

@injectable()
class FindMovieByIDService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    public async execute({ id }: IFindByIDMovie): Promise<Movie> {
        const customer = await this.moviesRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default FindMovieByIDService;
