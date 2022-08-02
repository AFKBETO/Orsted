import { EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { eventLogId, hotSauceId } from '../utils/channels'

export const magicNumber: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('magicnumber')
    .setDescription('Post magic number')
    .addNumberOption((option) => 
      option
        .setName('number')
        .setDescription('Magic number to post')
        .setRequired(true)
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true })
      const hotSauce = interaction.guild?.channels.cache.get(hotSauceId) as TextChannel
      const eventLog = interaction.guild?.channels.cache.get(eventLogId) as TextChannel
      const { user } = interaction
      const magicnumber = interaction.options.get('number', true).value
      const url = `https://nhentai.net/g/${magicnumber}`
      const messageEmbed = new EmbedBuilder()
      messageEmbed.setTitle('Magic Number used')
      messageEmbed.setDescription(url)
      messageEmbed.setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL()
      })
      await eventLog.send({ embeds: [messageEmbed] })
      const reply = await hotSauce.send(url)
      await interaction.editReply({ content: 'Magic number has been fetched' })
    } catch (error) {
      console.error('magicNumber')
      console.error(error)
    }
  },
}