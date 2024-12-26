/**
 * Represents an custom error for the API.
 */
export class ApiError extends Error {
  public readonly statusCode: number

  /**
   * Creates a new instance of the ApiError class
   * @param message The error message
   * @param statusCode The http status code of the error
   */
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}
