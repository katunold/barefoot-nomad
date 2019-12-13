import dotenv from 'dotenv';
import app from './helpers/express';
import db from './models';
import routes from './routes/index';

dotenv.config();

const { PORT, NODE_ENV, DB_DEV_NAME } = process.env;

// Test db connection
if (NODE_ENV === 'development') {
  db.sequelize
    .authenticate()
    .then(async () => {
      console.log(`successfully connected to the ${DB_DEV_NAME} `);
      await db.sequelize.sync({ force: true, logging: false });
    })
    .catch((err) => console.log(`Error: ${err}`));
}

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ error: `${err.name} :  ${err.message}` });
  }
  next();
});

app.get('/', (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to barefoot nomads, It's time to travel 😇" });
});

app.use(routes);

app.server = app.listen(PORT, () =>
  console.log(`server has started on port ${PORT}`),
);

const server = app.server;

export default server;
