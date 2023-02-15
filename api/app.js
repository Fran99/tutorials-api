const express = require('express');
const logger = require('morgan');

const helmet = require('helmet');
const { tutorialsRouter } = require('./src/components/tutorials/tutorialsRouter');
const { authRouter } = require('./src/components/auth/authRouter');
const { authenticationMiddleware } = require('./src/middlewares/authentication');
const { authorizationMiddleware } = require('./src/middlewares/authorization');
const { customErrors } = require('./src/middlewares/errors');
const { sequelize } = require('./models/index');

const app = express();

(async () => {
  await sequelize.sync({ force: true });
})();

app.use([
  helmet(),
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
]);

app.use('/v1/auth', authRouter);

app.use([
  authenticationMiddleware,
  authorizationMiddleware,
]);

app.use('/v1/tutorials', tutorialsRouter);
app.use(customErrors);

module.exports = app;
