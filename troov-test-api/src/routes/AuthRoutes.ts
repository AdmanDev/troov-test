import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

/**
 * This class is responsible for the routes related to the user authentication
 */
export class AuthRoutes {
  /**
   * Uses the routes
   * @returns The express router
   */
  public static use() {
    const router = Router()

    router.post('/register', AuthController.registerUser)
    router.post('/login', AuthController.logInUser)
    router.post('/logout', AuthController.logOutUser)

    return router
  }
}
