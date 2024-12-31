import { NextFunction, Request, Response } from 'express'
import { LostItemListResponse, LostItemRequest, LostItemResponse } from '../types/requests/LostItemRequest'
import { LostItemService } from '../services/LostItemService'
import { ApiError } from '../types/errors/ApiError'

/**
 * Represents the controller for the lost item entity
 */
export class LostItemController {
  /**
   * Gets all lost items
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static async getAllLostItems(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await LostItemService.getAll()

      const response: LostItemListResponse = {
        isError: false,
        data: items.map(item => item.toObject()),
      }

      res.json(response)
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new lost item
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static async createLostItem(req: Request, res: Response, next: NextFunction) {
    try {
      const createItemRequest: LostItemRequest = req.body

      const item = await LostItemService.create(createItemRequest)

      const response: LostItemResponse = {
        isError: false,
        data: item.toObject(),
      }

      res.status(201).json(response)
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Updates a lost item
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static async updateLostItem(req: Request, res: Response, next: NextFunction) {
    try {
      const itemId = req.params.id
      const updateItemRequest: LostItemRequest = req.body

      await LostItemService.update(itemId, updateItemRequest)
      const item = await LostItemService.getById(itemId)

      if (!item) {
        throw new ApiError('Objet non trouvé', 404)
      }

      const response: LostItemResponse = {
        isError: false,
        data: item.toObject(),
      }

      res.json(response)
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a lost item
   * @param req The request object
   * @param res The response object
   * @param next The next function
   */
  public static async deleteLostItem(req: Request, res: Response, next: NextFunction) {
    try {
      const itemId = req.params.id

      await LostItemService.delete(itemId)

      res.sendStatus(204)
    }
    catch (error) {
      next(error)
    }
  }
}
