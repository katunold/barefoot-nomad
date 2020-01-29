import { Router } from 'express';
import userRoute from './user.routes';
import tripRoute from './trip.routes';
import accommodationRoute from './accomodation.routes';
import notificationsRoute from './notification.routes';

const routes = Router();

routes.use('/', userRoute);
routes.use('/trip', tripRoute);
routes.use('/accommodation', accommodationRoute);
routes.use('/notifications', notificationsRoute);

export default routes;
