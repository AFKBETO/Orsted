import MatchModel, { MatchInt } from '../database/models/MatchModel'

const EXP_TIME = 86400

export const getMatchData = async (id1: string, id2: string): Promise<MatchInt> => {
  const matchData = 
    (await MatchModel.findOne({ id1: id1, id2: id2 })) ||
    (await MatchModel.findOne({ id1: id2, id2: id1})) ||
    (await MatchModel.create({
      id1: id1,
      id2: id2,
      value: Math.floor(Math.random() * 101),
      timestamp: Date.now()
    }))
  if ((Date.now() - matchData.timestamp)/1000 > EXP_TIME) {
    matchData.value = Math.floor(Math.random() * 101)
    matchData.timestamp = Date.now()
    await matchData.save()
  }
  return matchData
}