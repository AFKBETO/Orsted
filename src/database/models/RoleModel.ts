import { Document, model, Schema } from 'mongoose'

export interface RoleInt extends Document {
  roleId: string
  roleName: string
}

export const Role = new Schema({
  roleId: String,
  roleName: String
})

export default model<RoleInt>('role', Role)