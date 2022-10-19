import { Repository } from 'typeorm';
import {
    IMoviesRepository,
    SearchParams,
} from '../../../domain/repositories/IMoviesRepository';
import { dataSource } from '@shared/typeorm';
import { IMoviePaginate } from '../../../domain/models/IMoviePaginate';
import Movie from '../entities/Movie';
import { ICreateMovie } from '../../../domain/models/ICreateMovie';

class MoviesRepository implements IMoviesRepository {
    private repository: Repository<Movie>;

    constructor() {
        this.repository = dataSource.getRepository(Movie);
    }

    public async create(dto: ICreateMovie): Promise<Movie> {
        const movie = this.repository.create(dto);

        return this.repository.save(movie);
    }

    public async save(movie: Movie): Promise<Movie> {
        return this.repository.save(movie);
    }

    public async remove(movie: Movie): Promise<Movie> {
        return this.repository.remove(movie);
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IMoviePaginate> {
        const [movies, count] = await this.repository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: movies,
        };

        return result;
    }

    public async findByTitle(title: string): Promise<Movie | null> {
        const customer = await this.repository.findOneBy({
            title,
        });

        return customer;
    }

    public async findById(id: string): Promise<Movie | null> {
        const customer = await this.repository.findOneBy({
            id,
        });

        return customer;
    }
}

export default MoviesRepository;
