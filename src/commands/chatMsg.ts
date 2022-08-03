import { CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'

export const chatMsg: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Send a message')
    .addStringOption((option) => 
      option
        .setName('message')
        .setDescription('Message to send')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('quoteId')
        .setDescription('ID message to quote')
    )
    .setDefaultMemberPermissions(0) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.reply({ ephemeral: true, content: 'message has been sent' })
      const text = (interaction.options as CommandInteractionOptionResolver).getString('message', true)
      const quoteId = (interaction.options as CommandInteractionOptionResolver).getString('quoteId')
      if (quoteId) {
        const quoteMessage = await interaction.channel?.messages.fetch(quoteId)
        await quoteMessage?.reply(text)
      } else {
        await interaction.channel?.send(text)
      }
    } catch (error) {
      console.error(new Date(Date.now()), 'chat')
      console.error(error)
    }
  },
}