import { Client } from 'discord.js'
import { IntentOptions } from './config/IntentOptions'
import { connectDatabase } from './database/connectDatabase'
import { onInteraction } from './events/onInteraction'
import { onReady } from './events/onReady'
import { validateEnv } from './utils/validateEnv'
import * as dotenv from 'dotenv'
import { PartialOptions } from './config/PartialOptions'
import { onReactionAdd } from './events/onReactionAdd'

(async () => {
  dotenv.config()
  if (!validateEnv()) return

  const BOT = new Client({intents: IntentOptions, partials: PartialOptions})

  process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
  })

  BOT.once('ready', async () => await onReady(BOT))
  BOT.on('interactionCreate', async (interaction) => await onInteraction(interaction))
  BOT.on('messageReactionAdd', async (reaction) => await onReactionAdd(reaction))

  await connectDatabase()

  await BOT.login(process.env.BOT_TOKEN)
})()