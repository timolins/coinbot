import Telegraf from 'telegraf'

const app = new Telegraf(process.env.TOKEN)
const modes = require('./modes')

const buildQuery = mode => {
  const {title, message, description} = mode

  return {
    id: title,
    title,
    type: 'article',
    input_message_content: {
      message_text: message,
      parse_mode: 'Markdown'
    },
    description
  }
}

app.on('inline_query', ctx => {
  const {query} = ctx.update.inline_query

  const results = modes
  .map(mode => mode(query))
  .filter(mode => mode && mode.enabled)
  .map(mode => buildQuery(mode))

  ctx.answerInlineQuery(results, {
    is_personal: true,
    cache_time: 0
  })
})

app.startPolling()
