import type { LostItem } from '~/models/LostItem'

export type LostItemRequestData = Omit<LostItem, '_id'>
