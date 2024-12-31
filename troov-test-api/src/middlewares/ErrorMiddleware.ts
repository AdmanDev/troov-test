import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../types/errors/ApiError'
import { EmptyResponse } from '../types/requests/BaseResponse'

/**
 * Represents the error middleware
 */
export class ErrorMiddleware {
  /**
   * Handles errors
   * @param error The error object
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static handleErrors(error: Error, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500
    let errorMessage = 'Une erreur est survenue'

    if (res.headersSent) {
      next(error)
      return
    }

    if (error instanceof ApiError) {
      statusCode = error.statusCode
      errorMessage = error.message
    }

    const response: EmptyResponse = {
      isError: true,
      errorMessage,
    }

    res.status(statusCode).json(response)
  }
}
