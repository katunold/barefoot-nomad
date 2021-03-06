import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import configObject from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV;
const config = configObject[env];

let sequelize;
if (env !== 'development') {
  sequelize = new Sequelize(config.url, {
    logging: () => {},
    define: {
      freezeTableName: true,
    },
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const db = {
  User: sequelize.import('./user'),
  Trip: sequelize.import('./trip'),
  AccommodationFacility: sequelize.import('./accommodationFacility'),
  Request: sequelize.import('./request'),
  Notification: sequelize.import('./notification'),
  NotificationPreference: sequelize.import('./notificationPreference'),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
export default db;
