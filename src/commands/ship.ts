import { CommandInteractionOptionResolver, SlashCommandBuilder, TextChannel, User } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'

const randName = [
  ["Ariel", "Atofe", "Miko", "Kishirika Kishirisu"],
  [
    "Perugius", "Sieg", "Pax", "Darius", "Nokopara", "Hitogami",
    "Dark King Vita", "Gal Farion", "Luke", "Somal", "Philemon",
    "Orsted"
  ]
]

const randomName = (gender?: 0 | 1) => {
  let genderIndex: number
  if (gender !== undefined) genderIndex = gender
  else {
    if (Math.floor(Math.random() * 10) !== 0 ) genderIndex = 1
    else genderIndex = 0
  }
  return randName[genderIndex][Math.floor(Math.random() * randName[genderIndex].length)]
}

export const ship: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Ship somebody with someone else.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('Select a user to ship')
        .setRequired(true)
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply()
      let target = (interaction.options as CommandInteractionOptionResolver).getUser('user', true)
      let shippedTarget: string
      if (target.id === (interaction.client.user as User).id) {
        shippedTarget = randomName(1)
        target = interaction.user
        await interaction.editReply(`${interaction.client.user} has shipped ${target} with ${shippedTarget} for trying to ship with Orsted!`)
        return
      } else {
        shippedTarget = randomName()
        await interaction.editReply(`${interaction.user} has shipped ${target} with ${shippedTarget}!`)
      }
    } catch (error) {
      console.error(error)
    }
  },
}