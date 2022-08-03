import { CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { eventLogId, hotSauceId, orstedHotId } from '../utils/channels'

export const magicNumber: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('magicnumber')
    .setDescription('Post magic number')
    .addNumberOption((option) => 
      option
        .setName('number')
        .setDescription('Magic number to post')
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName('orstedcertified')
        .setDescription('Is this sauce Orsted-certified?')
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true })
      const eventLog = interaction.guild?.channels.cache.get(eventLogId) as TextChannel
      const { user } = interaction
      const magicnumber = (interaction.options as CommandInteractionOptionResolver).getNumber('number', true)
      const orstedCertified = (interaction.options as CommandInteractionOptionResolver).getBoolean('orstedcertified')
      let hotSauce: TextChannel
      if (orstedCertified) {
        hotSauce = interaction.guild?.channels.cache.get(orstedHotId) as TextChannel
      } else {
        hotSauce = interaction.guild?.channels.cache.get(hotSauceId) as TextChannel
      }
      const url = `https://nhentai.net/g/${magicnumber}`
      const log = await eventLog.send({ content: url })
      setTimeout(async () => {
        const embeds = (await log.fetch()).embeds
        if (embeds.length > 0) {
          const messageEmbed = new EmbedBuilder()
          messageEmbed.setTitle('Magic Number used')
          messageEmbed.setDescription(url)
          messageEmbed.setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL()
          })
          await log.edit({ embeds: [messageEmbed] })
          const reply = await hotSauce.send(url)
          await interaction.editReply({ content: 'Magic number has been fetched' })
        } else {
          interaction.editReply('Magic number not found')
          await log.delete()
        }
      }, 1000)
    } catch (error) {
      console.error(new Date(Date.now()), 'magicNumber')
      console.error(error)
    }
  },
}