const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const mysql = require('mysql2');
const chance = require('chance').Chance();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

config.host = process.env.MYSQL_HOST;
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0
      && file !== basename
      && file.slice(-3) === '.js'
      && file.indexOf('.test.js') === -1
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.run = async () => {
  if (process.env.NODE_ENV === 'production') return;
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: config.username,
    password: config.password,
  });
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${config.database}`,
    async (err) => {
      if (err) throw new Error('There was a problem trying to create the database');
      await sequelize.sync({ force: true });

      // Create test tutorials
      const tutorials = [];
      for (let i = 0; i < 200; i += 1) {
        tutorials.push(sequelize.models.Tutorial.create({
          title: chance.sentence({ words: 5 }),
          description: chance.paragraph({ sentences: 4 }),
          videoURL: chance.url(),
          publishedStatus: ['draft', 'pending', 'published'][chance.integer({ min: 0, max: 2 })],
        }));
      }
      await Promise.all(tutorials);
      await sequelize.models.User.create({
        name: 'Super',
        lastname: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
        password: 'admin',
      });
    },
  );
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
