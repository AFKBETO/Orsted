import { Document, model, Schema } from 'mongoose'

export interface MatchInt extends Document {
  id1: string
  id2: string
  value: number
  timestamp: number
}

export const Match = new Schema({
  id1: String,
  id2: String,
  value: Number,
  timestamp: Number
})

export default model<MatchInt>('match', Match)