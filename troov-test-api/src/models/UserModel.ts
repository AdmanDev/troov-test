import { model, Schema } from 'mongoose'
import { User } from '../types/databases/User'

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const UserModel = model<User>('User', userSchema)
