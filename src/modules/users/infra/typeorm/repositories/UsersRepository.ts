import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { Repository } from 'typeorm';
import { dataSource } from '../../../../../shared/typeorm';
import { IUsersRepository } from '../../../domain/repositories/UsersRepository';
import User from '../entities/User';

type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async create({ name, email, password }: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);

        return user;
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IPaginateUser> {
        const [users, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: users,
        };

        return result;
    }

    public async findByName(name: string): Promise<User | null> {
        const user = await this.ormRepository.findOneBy({
            name,
        });

        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOneBy({
            id,
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepository.findOneBy({
            email,
        });

        return user;
    }
}

export default UsersRepository;
