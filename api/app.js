const express = require('express');
const logger = require('morgan');
const { usersRouter } = require('./src/components/users/usersRouter');
const { tutorialsRouter } = require('./src/components/tutorials/tutorialsRouter');
const { authRouter } = require('./src/components/auth/authRouter');
const { authentication } = require('./src/middlewares/authentication');
const { authorization } = require('./src/middlewares/authorization');
const { customErrors } = require('./src/middlewares/errors');
const db = require('./models/index');

const app = express();

(async () => {
  await db.sequelize.run();
})();

app.use([
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
]);
app.use('/auth', authRouter);

app.use([
  authentication,
  authorization,
]);

app.use('/users', usersRouter);
app.use('/tutorials', tutorialsRouter);
app.use(customErrors);

module.exports = app;
