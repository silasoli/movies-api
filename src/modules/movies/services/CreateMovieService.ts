import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateMovie } from '../domain/models/ICreateMovie';
import { IMovie } from '../domain/models/IMovie';
import { IMoviesRepository } from '../domain/repositories/IMoviesRepository';

@injectable()
class CreateMovieService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    public async execute(dto: ICreateMovie): Promise<IMovie> {
        // const emailExists = await this.moviesRepository.findByEmail(email);

        // if (emailExists) {
        //     throw new AppError('Email address already used.');
        // }

        return this.moviesRepository.create(dto);
    }
}

export default CreateMovieService;
