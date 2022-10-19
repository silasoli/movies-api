import 'reflect-metadata';
import { app } from './app';
import { dataSource } from '../typeorm/';

dataSource.initialize().then(() => {
    const server = app.listen(3333, () => {
        console.log(`Server started on port ${3333}`);
    });
});
