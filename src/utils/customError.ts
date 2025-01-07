/**
 * CustomError class that extends the built-in Error class.
 * This class is used to create operational errors with a message and status code.
 */
class CustomError extends Error {
  public isOperational: boolean;

  /**
   * Creates an instance of CustomError.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=400] - The HTTP status code associated with the error (default is 400).
   */
  constructor(
    public message: string,
    public statusCode: number = 400,
  ) {
    super(message);

    this.isOperational = true; // Indicates that this is an operational error

    // Capture the stack trace for better debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
