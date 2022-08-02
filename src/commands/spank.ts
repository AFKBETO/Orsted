import { User, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'


const randSpank = [
  "https://c.tenor.com/4RIbgFCLRrUAAAAC/rikka-takanashi-bad-girl.gif",
  "https://c.tenor.com/WNnO4lxUMVQAAAAC/anime-school-girl.gif",
  "https://c.tenor.com/5ropePOLZV4AAAAC/bad-beat.gif",
  "https://c.tenor.com/gScnebhgJn4AAAAC/taritari-anime-spank.gif"
]

const memorySpank = {
  oldSpank: '',
  spankCount: 0
}

export const spank: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('spank')
    .setDescription('Try to spank somebody')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('Select a target')
        .setRequired(true)
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply()
      const { user } = interaction
      const target = (interaction.options as CommandInteractionOptionResolver).getMember('target') as GuildMember
      let spankUrl = memorySpank.oldSpank
      while (spankUrl == memorySpank.oldSpank) {
        spankUrl = randSpank[Math.floor(Math.random() * randSpank.length)]
        if (spankUrl == memorySpank.oldSpank) {
          if (memorySpank.spankCount < 2) {
            memorySpank.spankCount++
            break
          }
        } else {
          memorySpank.spankCount = 0
        }
      }
      memorySpank.oldSpank = spankUrl
      const msgEmbed = new EmbedBuilder()
        .setTitle('Spank')
        .setAuthor({
          name: user.tag,
          iconURL: user.displayAvatarURL()
        })
        .setImage(spankUrl)
      let desc = ''
      if (target.id === user.id) {
        desc = `${target} has spanked him/herself!`
      } else if (
        target.id === (interaction.client.user as User).id ||
        (target.permissions.has(PermissionFlagsBits.Administrator))
      ) {
        desc = `${interaction.client.user} has spanked ${user} for trying to spank ${target}!`
      } else if (
        (interaction.memberPermissions as PermissionsBitField).has(PermissionFlagsBits.KickMembers, true) ||
        (interaction.member as GuildMember).roles.premiumSubscriberRole !== null
      ) {
        desc = `${user} has spanked ${target}!`
      } else {
        if (
          target.permissions.has(PermissionFlagsBits.KickMembers, true) ||
          target.roles.premiumSubscriberRole !== null
        ) {
          desc = `${user} tried to spank ${target}, but got spanked instead!`
        } else {
          desc = `${user} has been spanked!`
        }
      }
      msgEmbed.setDescription(desc)
      interaction.editReply({ embeds: [msgEmbed] })
    } catch (error) {
      console.error(new Date(Date.now()), 'spank')
      console.log(error)
    }
  }
}