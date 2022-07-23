import { Client } from 'discord.js'
import { IntentOptions } from './config/IntentOptions'
import { connectDatabase } from './database/connectDatabase'
import { onInteraction } from './events/onInteraction'
import { onReady } from './events/onReady'
import { validateEnv } from './utils/validateEnv'
import * as dotenv from 'dotenv'

(async () => {
  dotenv.config()
  if (!validateEnv()) return

  const BOT = new Client({intents: IntentOptions})

  process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
  })

  BOT.on('ready', async () => await onReady(BOT))
  BOT.on('interactionCreate', async (interaction) => await onInteraction(interaction))
  

  await connectDatabase()

  await BOT.login(process.env.BOT_TOKEN)
})()