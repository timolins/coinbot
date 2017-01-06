import Telegraf from 'telegraf'

import chatMode from './chat-mode'
import inlineMode from './inline-mode'

const app = new Telegraf(process.env.TOKEN)

app.use(chatMode)
app.use(inlineMode)

app.telegram.getMe().then(({username}) => {
  console.log(`${username} is running!`)
  app.options.username = username
})

app.startPolling()
