import { CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { eventLogId, hotSauceId, orstedHotId } from '../utils/channels'
import { nhentai, parseTagList } from '../utils/magicAPI'

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
      const magicNumber = (interaction.options as CommandInteractionOptionResolver).getNumber('number', true)
      const orstedCertified = (interaction.options as CommandInteractionOptionResolver).getBoolean('orstedcertified')
      let hotSauce: TextChannel
      if (orstedCertified) {
        hotSauce = interaction.guild?.channels.cache.get(orstedHotId) as TextChannel
      } else {
        hotSauce = interaction.guild?.channels.cache.get(hotSauceId) as TextChannel
      }
      if (nhentai.exists(magicNumber)) {
        const magicBook = await nhentai.getDoujin(magicNumber)
        const messageEmbed = new EmbedBuilder()
          .setTitle(magicBook.title)
          .setURL(magicBook.link)
          .setImage(magicBook.details.pages[0])
          .setFields(
            { name: 'Artists', value: parseTagList(magicBook.details.artists) },
            { name: 'Tags', value: parseTagList(magicBook.details.tags) }
          )
        const logEmbed = new EmbedBuilder()
          .setTitle('Magic Number used')
          .setDescription('magicBook.link')
          .setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL()
          })
        await hotSauce.send({ embeds: [messageEmbed] })
        await eventLog.send({ embeds: [logEmbed] })
        await interaction.editReply({ content: 'Magic number has been fetched' })
      } else {
        interaction.editReply('Magic number not found')
      }
    } catch (error) {
      console.error(new Date(Date.now()), 'magicNumber')
      console.error(error)
    }
  },
}