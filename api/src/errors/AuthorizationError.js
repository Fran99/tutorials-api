/**
 * Authorization error class thrown when there is an authorization like error.
 */
class AuthorizationError extends Error {
  constructor() {
    super();
    this.code = 403;
    this.message = 'You do not have permission to access this resource';
  }
}

module.exports = {
  AuthorizationError,
};
