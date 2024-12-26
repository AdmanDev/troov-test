import { LostItemModel } from '../models/LostItemModel'
import { LostItem } from '../types/databases/LostItem'
import { ApiError } from '../types/errors/ApiError'

/**
 * Represents the service for the lost item entity CRUD operations
 */
export class LostItemService {
  /**
   * Gets all lost items
   * @returns The list of lost items
   */
  public static async getAll() {
    try {
      return await LostItemModel.find()
    }
    catch {
      throw new ApiError('Impossible de récupérer la liste des objets perdus', 500)
    }
  }

  /**
   * Gets a lost item by its id
   * @param itemId The id of the lost item to be retrieved
   * @returns The lost item
   */
  public static async getById(itemId: string) {
    try {
      return await LostItemModel.findById(itemId)
    }
    catch {
      throw new ApiError('Impossible de récupérer cet objet', 500)
    }
  }

  /**
   * Creates a new lost item
   * @param item The lost item to be created
   * @returns The created item
   */
  public static async create(item: Omit<LostItem, '_id'>) {
    try {
      return await LostItemModel.create(item)
    }
    catch {
      throw new ApiError(`Impossible de créer l'objet perdu`, 500)
    }
  }

  /**
   * Updates a lost item
   * @param itemId The id of the lost item to be updated
   * @param item The updated lost item
   */
  public static async update(itemId: string, item: Omit<LostItem, '_id'>) {
    try {
      await LostItemModel.updateOne({ _id: itemId }, item)
    }
    catch {
      throw new ApiError('Impossible de mettre à jour cet objet', 500)
    }
  }

  /**
   * Deletes a lost item
   * @param itemId The id of the lost item to be deleted
   */
  public static async delete(itemId: string) {
    try {
      await LostItemModel.deleteOne({ _id: itemId })
    }
    catch {
      throw new ApiError('Impossible de supprimer cet objet', 500)
    }
  }
}
