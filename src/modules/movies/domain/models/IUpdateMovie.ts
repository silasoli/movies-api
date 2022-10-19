import { ICreateMovie } from './ICreateMovie';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUpdateMovie extends ICreateMovie {
    id: string;
}
