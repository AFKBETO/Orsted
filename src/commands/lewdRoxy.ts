import { SlashCommandBuilder, TextChannel } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'

const lewdRoxyUrl = 'https://media.discordapp.net/attachments/814170813137420338/836444509415800873/ohnopoorroxy3.jpg?width=338&height=467'

export const lewdRoxy: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('lewdroxy')
    .setDescription('God is horny today') as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply()
      if ((interaction.channel as TextChannel).nsfw) {
        await interaction.editReply(lewdRoxyUrl)
        return
      }
      await interaction.deleteReply()
      await interaction.followUp({ content: 'Cannot send in SFW channel', ephemeral: true })

    } catch (error) {
      console.error(error)
    }
  },
}