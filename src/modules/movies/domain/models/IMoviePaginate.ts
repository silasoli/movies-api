import { IMovie } from './IMovie';

export interface IMoviePaginate {
    per_page: number;
    total: number;
    current_page: number;
    data: IMovie[];
}
