import { CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder, TextChannel, User } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { getMatchData } from '../modules/matchData'
import randomName from './randName'

const commentMatch = (value: number): string => {
  if (value === 69) return 'Nice!'
  if (value === 0) return 'Do you hate each other that much?'
  if (value < 15) return 'What a failure!'
  if (value < 30) return 'Terrible!'
  if (value < 45) return 'Not really good!'
  if (value < 60) return 'Not bad!'
  if (value < 75) return 'Great!'
  if (value < 90) return 'Excellent!'
  return 'Congratulation!'
}

export const match: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('match')
    .setDescription('Check compatibility between somebody with someone else.')
    .addUserOption((option) =>
      option
        .setName('target1')
        .setDescription('Select a user to calculate match')
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('target2')
        .setDescription('Select a second user to calculate match')
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply()
      const { user } = interaction
      let target1 = (interaction.options as CommandInteractionOptionResolver).getUser('target1', true)
      let target2 = (interaction.options as CommandInteractionOptionResolver).getUser('target2')
      let shippedTarget: string
      const msgEmbed = new EmbedBuilder()
      msgEmbed.setTitle('Match Result')
      if (target2 === null) {
        shippedTarget = randomName()
        while (shippedTarget === 'Orsted') {
          shippedTarget = randomName()
        }
        const matchData = await getMatchData(target1.id, shippedTarget)
        msgEmbed.setDescription(`The compatibility of ${target1} and ${shippedTarget} is ${matchData.value}%. ${commentMatch(matchData.value)}`)
      } else {
        const matchData = await getMatchData(target1.id, target2.id)
        msgEmbed.setDescription(`The compatibility of ${target1} and ${target2} is ${matchData.value}%. ${commentMatch(matchData.value)}`)
      }
      msgEmbed.setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL()
      })
      await interaction.editReply({ embeds: [msgEmbed]})
      return
    } catch (error) {
      console.error(error)
    }
  },
}