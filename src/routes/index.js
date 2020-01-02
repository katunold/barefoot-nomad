import { Router } from 'express';
import userRoute from './user.routes';
import tripRoute from './trip.routes';

const routes = Router();

routes.use('/', userRoute);
routes.use('/trip', tripRoute);

export default routes;
