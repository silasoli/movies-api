import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MoviesController from '../controllers/MoviesController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.use(isAuthenticated);

moviesRouter.get('/', moviesController.findAll);

moviesRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    moviesController.findByID,
);

moviesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            // email: Joi.string().email().required(),
        },
    }),
    moviesController.create,
);

moviesRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            // email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    moviesController.update,
);

moviesRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    moviesController.delete,
);

export default moviesRouter;
