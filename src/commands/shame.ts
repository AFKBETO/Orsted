import { CommandInteractionOptionResolver, EmbedBuilder, GuildMember, SlashCommandBuilder, TextChannel } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { createShameData } from '../modules/shameData'
import { shameId } from '../utils/channels'

export const shame: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('shame')
    .setDescription('Shame somebody')
    .addAttachmentOption((option) =>
      option
        .setName('proof')
        .setDescription('Attach a pic to shame')
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('Select a user to shame')
    )
    .addStringOption((option) =>
      option
        .setName('comment')
        .setDescription('Comment on the shame')
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true })

      const { user } = interaction
      const options = interaction.options as CommandInteractionOptionResolver
      const target = options.getMember('target') as GuildMember | null
      const imageUrl = options.getAttachment('proof', true).url
      const comment = options.getString('comment') || `Shame on you${target ? `, ${target}` : ''}`
      const shameChannel = interaction.guild?.channels.cache.get(shameId) as TextChannel

      const msgEmbed = new EmbedBuilder()
        .setTitle('Shame')
        .setAuthor({
          name: user.tag,
          iconURL: user.displayAvatarURL()
        })
        .setImage(imageUrl)
        .setDescription(comment)
      
      const reply = await shameChannel.send({ embeds: [msgEmbed] })
      reply.react('814457607720796212')
      await createShameData(reply.id, user.id, target ? target.id : 'null')
      await interaction.editReply({ content: `${target} has been shamed.`})
    } catch (error) {
      console.error('shame')
      console.error(error)
    }
  }
}