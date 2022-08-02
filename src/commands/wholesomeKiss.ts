import { SlashCommandBuilder, TextChannel } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'

const wholesomeUrl = [
  "https://media.discordapp.net/attachments/824175906120663060/843483983080849418/E0ndCMxVoAAeSy3.png?width=804&height=504",
  "https://media.discordapp.net/attachments/824175906120663060/843465128644313108/20210511_104844.png?width=952&height=504"
]

const kissMemory = {
  oldKiss: 0,
  kissCount: 0
}

export const wholesomeKiss: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('wholesomekiss')
    .setDescription('Post a wholesome kiss') as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply()
      let kissIndex: number
      if (kissMemory.kissCount >= 2) {
        kissMemory.kissCount = 0
        if (kissMemory.oldKiss === 0) {
          kissIndex = 1
        } else {
          kissIndex = 0
        }
      } else {
        kissIndex = Math.floor(Math.random() * 2)
        if (kissIndex === kissMemory.oldKiss) {
          kissMemory.kissCount++
        } else {
          kissMemory.oldKiss = kissIndex
          kissMemory.kissCount = 0
        }
      }

      await interaction.editReply(wholesomeUrl[kissIndex])

    } catch (error) {
      console.error('wholesomeKiss')
      console.error(error)
    }
  },
}