import { inject, injectable } from 'tsyringe';
import { IMoviePaginate } from '../domain/models/IMoviePaginate';
import { IMoviesRepository } from '../domain/repositories/IMoviesRepository';

interface SearchParams {
    page: number;
}

@injectable()
class ListMoviesService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    public async execute({ page }: SearchParams): Promise<IMoviePaginate> {
        const take = 10;
        const skip = (Number(page) - 1) * take;
        const movies = await this.moviesRepository.findAll({
            page,
            skip,
            take,
        });

        return movies;
    }
}

export default ListMoviesService;
