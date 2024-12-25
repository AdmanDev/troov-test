import { Router } from 'express'

/**
 * The AppRoutes class is responsible for initializing all routes
 */
export class AppRoutes {
  /**
   * Initializes all routes
   * @returns The express router
   */
  static use() {
    const router = Router()

    router.get('/test', (req, res) => {
      res.json({ message: 'Hello, world!' })
    })

    return router
  }
}
