import { Document, model, Schema } from 'mongoose'

export interface DegenInt extends Document {
  discordId: string
  timestamp: number
}

export const Degen = new Schema({
  discordId: String,
  timestamp: Number
})

export default model<DegenInt>('degen', Degen)