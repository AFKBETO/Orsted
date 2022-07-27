import { MessageReaction, PartialMessageReaction } from 'discord.js'
import { getShameData } from '../modules/shameData'

export const onReactionAdd = async (reaction: MessageReaction | PartialMessageReaction) => {
  if (reaction.partial) {
    try {
      await reaction.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message', error)
      return
    }
  }

  const shameData = await getShameData(reaction.message.id)
  if (shameData !== null) {
    const shameEmoji = reaction.message.reactions.cache.get('814457607720796212')
    if (shameEmoji !== undefined) shameData.reactCount = shameEmoji.count - 1
    await shameData.save()
  }
}