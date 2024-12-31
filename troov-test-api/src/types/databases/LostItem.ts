export enum LostItemStatus {
  FOUND = 'FOUND',
  LOST = 'LOST',
}

export type LostItem = {
  _id: string
  name: string
  description: string
  location: string
  date: Date
  status: LostItemStatus
  imageUrl: string
}
