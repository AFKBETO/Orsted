import RoleModel, { RoleInt } from '../database/models/RoleModel'

export const getRoleData = async (): Promise<RoleInt[]> => {
  const roleData = await RoleModel.find()
  
  return roleData
}

export const addRoleData = async (roleId: string, roleName: string): Promise<RoleInt> => {
  const roleData = await RoleModel.create({
    roleId: roleId,
    roleName: roleName
  })
  
  return roleData
}

export const removeRoleData = async (roleId: string): Promise<void> => {
  await RoleModel.deleteOne({
    roleId: roleId
  })
}