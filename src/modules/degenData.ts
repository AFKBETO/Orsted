import DegenModel, { DegenInt } from '../database/models/DegenModel'

export const getDegenData = async (id: string): Promise<DegenInt> => {
  const degenData =
    (await DegenModel.findOne({ discordId: id })) ||
    (await DegenModel.create({
      discordId: id,
      timestamp: Date.now()
    }))
    return degenData
}

export const updateDegenData = async (degen: DegenInt) =>  {
  degen.timestamp = Date.now()
  await degen.save()
  return degen
}