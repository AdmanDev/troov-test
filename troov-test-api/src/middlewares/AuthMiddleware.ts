import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../types/errors/ApiError'
import { AccessTokenPayload } from '../types/auth/AccessTokenPayload'
import { UserModel } from '../models/UserModel'

/**
 * This middleware is responsible for authenticating the user before accessing protected routes
 */
export class AuthMiddleware {
  /**
   * Verifies if the user is connected before accessing a protected route
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = AuthMiddleware.getAuthTokenFromCookie(req)
      const claims = AuthMiddleware.getUserClaims(token)

      req.loggedUser = AuthMiddleware.getUserById(claims.userId)

      next()
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Gets the authentication token from the request cookies
   * @param req The request object containing cookies
   * @returns The authentication token
   */
  private static getAuthTokenFromCookie(req: Request) {
    const authCookieName = process.env.AUTH_COOKIE_NAME as string

    const token: string = req.cookies[authCookieName]

    if (!token) {
      throw new ApiError('Veuillez vous connecter', 401)
    }

    return token
  }

  /**
   * Gets user claims from a given authentication token
   * @param token The authentication token
   * @returns The payload containing the user id
   */
  private static getUserClaims(token: string) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string

    const payload = jwt.verify(token, jwtSecretKey) as AccessTokenPayload | null

    if (!payload || !payload.userId) {
      throw new ApiError('Veuillez vous connecter', 401)
    }

    return payload
  }

  /**
   * Gets user by id
   * @param id The user id
   * @returns The user
   */
  private static async getUserById(id: string) {
    const user = UserModel.findById(id)

    if (!user) {
      throw new ApiError('Veuillez vous connecter', 401)
    }

    return user
  }
}
