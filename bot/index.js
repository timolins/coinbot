import Telegraf from 'telegraf'

import command from './command'
import inline from './inline'

const app = new Telegraf(process.env.TOKEN)

command(app)
inline(app)

app.telegram.getMe().then(bot => {
  const {username} = bot
  console.log(`${username} is running!`)
  app.options.username = username
})

app.startPolling()
