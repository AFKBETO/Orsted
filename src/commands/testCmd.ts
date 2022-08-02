import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { getDegenData, updateDegenData } from '../modules/degenData'

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
      await interaction.deferReply()
      const { user } = interaction
      const text = interaction.options.get('message', true).value

      const targetDegen = await getDegenData(user.id)
      const updatedDegen = await updateDegenData(targetDegen)

      const messageEmbed = new EmbedBuilder()
      messageEmbed.setTitle('Test Message')
      messageEmbed.setDescription(text as string)
      messageEmbed.setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL()
      })
      messageEmbed.setFooter({
        text: 'Time: ' + new Date(updatedDegen.timestamp).toLocaleDateString()
      })

      await interaction.editReply({ embeds: [messageEmbed] })
    } catch (error) {
      console.error('testCmd')
      console.error(error)
    }
  },
}