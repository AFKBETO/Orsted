import { CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'

export const testCmd: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('testcmd')
    .setDescription('Test this command')
    .addStringOption((option) => 
      option
        .setName('message')
        .setDescription('Message to update')
        .setRequired(true)
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true })
      const text = (interaction.options as CommandInteractionOptionResolver).getString('message', true)
      await interaction.editReply({ content: text })
      setTimeout(async () => {
        const embeds = (await interaction.fetchReply()).embeds
        if (embeds.length > 0) {
          await interaction.editReply('url ok')
        } else {
          interaction.editReply('url not ok')
        }
      }, 1000)
    } catch (error) {
      console.error('testCmd')
      console.error(error)
    }
  },
}