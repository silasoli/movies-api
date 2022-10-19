import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMovieService from '../../../services/CreateMovieService';
import DeleteMovieService from '../../../services/DeleteMovieService';
import FindMovieByIDService from '../../../services/FindMovieByIDService';
import ListMoviesService from '../../../services/ListMoviesService';
import UpdateMovieService from '../../../services/UpdateMovieService';

export default class MoviesController {
    public async findAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 15;

        const listMovies = container.resolve(ListMoviesService);
        const movies = await listMovies.execute({ page, limit });

        return response.json(movies);
    }

    public async findByID(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const showMovie = container.resolve(FindMovieByIDService);

        const movie = await showMovie.execute({ id });

        return response.json(movie);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;

        const createMovie = container.resolve(CreateMovieService);

        const movie = await createMovie.execute({
            name,
            email,
        });

        return response.json(movie);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;

        const updateMovie = container.resolve(UpdateMovieService);

        const movie = await updateMovie.execute({
            id,
            name,
            email,
        });

        return response.json(movie);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteMovie = container.resolve(DeleteMovieService);

        await deleteMovie.execute({ id });

        return response.json([]);
    }
}
