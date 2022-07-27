import ShameModel, { ShameInt } from '../database/models/ShameModel'

export const getShameData = async (id: string): Promise<ShameInt | null> => {
  const shameData = await ShameModel.findOne({ id: id })
  
  return shameData
}

export const createShameData = async (id: string, fromId: string, targetId: string = ''):  Promise<ShameInt> => {
  const shameData = await ShameModel.create({
    id: id,
    fromId: fromId,
    targetId: targetId,
    reactCount: 0
  })
  
  return shameData
}