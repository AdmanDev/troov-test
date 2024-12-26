import { Router } from 'express'
import { LostItemRoutes } from './LostItemRoutes'

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

    router.use('/lost-item', LostItemRoutes.use())

    return router
  }
}
