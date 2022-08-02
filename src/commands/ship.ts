import { CommandInteractionOptionResolver, SlashCommandBuilder, TextChannel, User } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import randomName from './randName'

export const ship: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Ship somebody with someone else')
    .addUserOption((option) =>
      option
        .setName('target1')
        .setDescription('Select a user to ship')
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('target2')
        .setDescription('Select a second user to ship')
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply()
      let target1 = (interaction.options as CommandInteractionOptionResolver).getUser('target1', true)
      let target2 = (interaction.options as CommandInteractionOptionResolver).getUser('target2')
      let shippedTarget: string
      if (target1.id === (interaction.client.user as User).id) {
        shippedTarget = randomName(1)
        target1 = interaction.user
        await interaction.editReply(`${interaction.client.user} has shipped ${target1} with ${shippedTarget} for trying to ship with Orsted!`)
        return
      }
      if (target2 === null) {
        shippedTarget = randomName()
        await interaction.editReply(`${interaction.user} has shipped ${target1} with ${shippedTarget}!`)
        return
      }
      await interaction.editReply(`${interaction.user} has shipped ${target1} with ${target2}!`)
      return
    } catch (error) {
      console.error('ship')
      console.error(error)
    }
  },
}