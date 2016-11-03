import Telegraf from 'telegraf'

import chatMode from './chat-mode'
import inlineMode from './inline-mode'

const app = new Telegraf(process.env.TOKEN)

chatMode(app)
inlineMode(app)

app.telegram.getMe().then(bot => {
  const {username} = bot
  console.log(`${username} is running!`)
  app.options.username = username
})

app.startPolling()
