import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IMovie } from '../../../domain/models/IMovie';

@Entity('movies')
class Movie implements IMovie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    poster: string;

    @Column()
    release_year: string;

    @Column()
    genres: string;

    @Column('decimal')
    imdb: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Movie;
