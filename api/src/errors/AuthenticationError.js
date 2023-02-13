/**
 * Error thrown to unauthenticated users.
 */
class AuthenticationError extends Error {
  constructor() {
    super();
    this.code = 401;
  }
}

module.exports = {
  AuthenticationError,
};
