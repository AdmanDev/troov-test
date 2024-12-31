import { Router } from 'express'
import { LostItemController } from '../controllers/LostItemController'

/**
 * This class is responsible for the routes related to the lost items
 */
export class LostItemRoutes {
  /**
   * Uses the routes
   * @returns The express router
   */
  public static use() {
    const router = Router()

    router.get('/', LostItemController.getAllLostItems)
    router.post('/', LostItemController.createLostItem)
    router.put('/:id', LostItemController.updateLostItem)
    router.delete('/:id', LostItemController.deleteLostItem)

    return router
  }
}
