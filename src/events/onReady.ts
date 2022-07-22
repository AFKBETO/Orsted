import { REST } from '@discordjs/rest'
import { Client } from 'discord.js'
import { Routes } from 'discord-api-types/v10'
import { CommandList } from '../commands/_CommandList'

export const onReady = async (BOT: Client) => {
  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string)

  const commandData = CommandList.map((command) => command.data.toJSON())

  await rest.put(
    Routes.applicationGuildCommands(
      BOT.user?.id || 'missing id',
      process.env.GUILD_ID as string
    ),
    { body: commandData }
  )

  console.log('Discord ready!')
}