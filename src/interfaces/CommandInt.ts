import { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'

export interface CommandInt {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
  run: (interaction: CommandInteraction) => Promise<void>
}