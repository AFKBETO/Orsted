import { Document, model, Schema } from 'mongoose'

export interface ShameInt extends Document {
  id: string
  fromId: string
  targetId: string
  reactCount: number
}

export const Shame = new Schema({
  id: String,
  fromId: String,
  targetId: String,
  reactCount: Number
})

export default model<ShameInt>('shame', Shame)