import { model, Schema } from 'mongoose'
import { LostItem, LostItemStatus } from '../types/databases/LostItem'

const lostItemSchema = new Schema<LostItem>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: 'Inconnu',
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(LostItemStatus),
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
})

export const LostItemModel = model<LostItem>('lost_item', lostItemSchema)
