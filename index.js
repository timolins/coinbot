import Telegraf from 'telegraf'

const modes = require('./modes')

const app = new Telegraf(process.env.TOKEN)

const buildQuery = (title, message) => ({
  id: title,
  title,
  type: 'article',
  input_message_content: {
    message_text: message,
    parse_mode: 'Markdown'
  }
})

app.on('inline_query', ctx => {
  const {query} = ctx.update.inline_query

  const results = modes
  .map(mode => mode(query))
  .filter(mode => mode && mode.enabled)
  .map(mode => buildQuery(mode.title, mode.message))

  ctx.answerInlineQuery(results, {
    is_personal: true,
    cache_time: 0
  })
})

app.startPolling()
