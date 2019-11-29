import app from './helpers/express';
import db from './models';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

// Test db connection
if (process.env.NODE_ENV === 'development') {
  db.sequelize.authenticate()
    .then(async () => {
      console.log(`successfully connected to the ${process.env.DB_DEV_NAME} `);
      await db.sequelize.sync({force: true, logging: false})
    })
    .catch(err => console.log(`Error: ${err}`));
}

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({error : `${err.name} :  ${err.message}`});
  }
  next();
});

app.get('/', (req, res) => {
  res.status(200).send({message: 'Welcome to barefoot nomads, It\'s time to travel 😇'})
});

app.server = app.listen(PORT, ()=>console.log(`server has started on port ${PORT}`));

export default app;
