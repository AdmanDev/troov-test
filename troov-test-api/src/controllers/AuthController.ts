import { NextFunction, Request, Response } from 'express'
import { UserRegisterationRequest } from '../types/requests/UserRegisterationRequest'
import { AuthService } from '../services/AuthService'
import { LoginRequest } from '../types/requests/LoginRequest'
import { ApiError } from '../types/errors/ApiError'

/**
 * Represents the controller for the user authentication
 */
export class AuthController {
  /**
   * Registers a new user
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, psw, pswConfirm }: UserRegisterationRequest = req.body

      await AuthService.registerUser(email, psw, pswConfirm)

      res.sendStatus(201)
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Logs in a user
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static async logInUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, psw }: LoginRequest = req.body

      const authToken = await AuthService.logInUser(email, psw)
      AuthController.setAuthCookie(res, authToken)

      res.sendStatus(200)
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Logs in a user from a cookie
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static logInWithCookie(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.loggedUser) {
        throw new ApiError('Veuillez vous connecter', 401)
      }

      res.sendStatus(200)
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Logs out a user
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static logOutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authCookieName = process.env.AUTH_COOKIE_NAME as string

      res.clearCookie(authCookieName)
      res.sendStatus(200)
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Sets an authentication cookie with the given token
   * @param res The response object to set the cookie on
   * @param authToken The authentication token to be stored in the cookie
   */
  private static setAuthCookie(res: Response, authToken: string) {
    const authCookieName = process.env.AUTH_COOKIE_NAME as string
    const cookieMaxAge = parseInt(process.env.AUTH_COOKIE_MAX_AGE as string)

    res.cookie(authCookieName, authToken, {
      httpOnly: true,
      secure: true,
      maxAge: cookieMaxAge,
      sameSite: 'none',
    })
  }
}
