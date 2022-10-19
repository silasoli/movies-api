import { DataSource } from 'typeorm';
import Movie from '../../modules/movies/infra/typeorm/entities/Movie';
import User from '../../modules/users/typeorm/entities/User';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'moviesapi',
    entities: [User, Movie],
    migrations: [],
});
