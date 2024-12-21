class ApiError extends Error {
  constructor(status, message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.message = message;
    this.success = false;

    Error.captureStackTrace(this);
  }
}

export default ApiError;
