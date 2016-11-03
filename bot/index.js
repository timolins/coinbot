import Telegraf from 'telegraf'

import commandMode from './commandMode'
import inlineMode from './inlineMode'

const app = new Telegraf(process.env.TOKEN)

commandMode(app)
inlineMode(app)

app.telegram.getMe().then(bot => {
  const {username} = bot
  console.log(`${username} is running!`)
  app.options.username = username
})

app.startPolling()
