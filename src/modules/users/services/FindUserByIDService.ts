import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../domain/repositories/UsersRepository';
import { IShowUser } from '../domain/models/IFindByIDUser';

@injectable()
class ShowUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ id }: IShowUser): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        return user;
    }
}

export default ShowUserService;
