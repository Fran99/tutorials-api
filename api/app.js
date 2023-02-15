const express = require('express');
const logger = require('morgan');

const helmet = require('helmet');
const { tutorialsRouter } = require('./src/components/tutorials/tutorialsRouter');
const { authRouter } = require('./src/components/auth/authRouter');
const { authenticationMiddleware } = require('./src/middlewares/authenticationMiddleware');
const { authorizationMiddleware } = require('./src/middlewares/authorizationMiddleware');
const { customErrors } = require('./src/middlewares/customErrorsMiddleware');
const { sequelize } = require('./models/index');

const app = express();

(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (e) {
    console.log('No database connection...');
    process.exit(1);
  }
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
