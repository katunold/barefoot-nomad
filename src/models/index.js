import fs from 'fs';
import path from 'path'
import Sequelize from 'sequelize';
import configObject from '../config/config';
import dotenv from 'dotenv';

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = configObject[env];

const db = {};

let sequelize;
if (env !== 'development') {
  sequelize = new Sequelize(config.url, {
    logging: () => {},
    define: {
      freezeTableName: true
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
