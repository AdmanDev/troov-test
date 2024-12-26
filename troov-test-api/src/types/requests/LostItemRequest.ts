import { LostItem } from '../databases/LostItem'
import { BaseResponse } from './BaseResponse'

export type LostItemRequest = Omit<LostItem, '_id'>

export type LostItemResponse = BaseResponse<LostItem>
export type LostItemListResponse = BaseResponse<LostItem[]>
