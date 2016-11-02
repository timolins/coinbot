import Telegraf from 'telegraf'

const app = new Telegraf(process.env.TOKEN)
const modes = require('./modes')

const url = process.env.URL || process.env.NOW_URL || ''

const buildAnswer = mode => {
  const {title, message, description, thumb} = mode

  return {
    id: title,
    title,
    description,
    type: 'article',
    input_message_content: {
      message_text: message,
      parse_mode: 'Markdown'
    },
    thumb_url: `${url}/static/thumbs/${thumb}`
  }
}

// Inline Mode
app.on('inline_query', ctx => {
  const {query} = ctx.update.inline_query

  const results = modes
  .map(mode => mode(query))
  .filter(mode => mode && mode.enabled)
  .map(mode => buildAnswer(mode))

  ctx.answerInlineQuery(results, {
    is_personal: true,
    cache_time: 0
  })
})

// Command Mode
modes.forEach(mode => {
  const m = mode()
  app.command(m.command, ctx => {
    const {text} = ctx.update.message
    const index = text.trim().indexOf(' ')
    const query = index > 0 ? text.substr(index + 1) : ''

    const {message} = mode(query)

    ctx.reply(message, {
      parse_mode: 'Markdown'
    })
  })
})

app.telegram.getMe().then(bot => {
  const {username} = bot
  console.log(`${username} is running!`)
  app.options.username = username
})

app.startPolling()
