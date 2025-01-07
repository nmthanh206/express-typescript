class CustomError extends Error {
  public isOperational: boolean;

  constructor(
    public message: string,
    public statusCode: number = 400,
  ) {
    super(message);

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default CustomError;
