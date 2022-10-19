import Movie from '../../infra/typeorm/entities/Movie';
import { ICreateMovie } from '../models/ICreateMovie';
import { IMovie } from '../models/IMovie';
import { IMoviePaginate } from '../models/IMoviePaginate';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface IMoviesRepository {
    create(dto: ICreateMovie): Promise<Movie>;
    save(movie: IMovie): Promise<Movie>;
    remove(movie: IMovie): Promise<Movie>;
    findByTitle(title: string): Promise<Movie | null>;
    findById(id: string): Promise<Movie | null>;
    findAll({ page, skip, take }: SearchParams): Promise<IMoviePaginate>;
}
