export type LostItemStatus = 'FOUND' | 'LOST'

export type LostItem = {
  _id: string
  name: string
  description: string
  location: string
  date: string
  status: LostItemStatus
  imageUrl: string
}
