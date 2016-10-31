import Telegraf from 'telegraf'

const app = new Telegraf(process.env.TOKEN)
const modes = require('./modes')

const url = process.env.URL || process.env.NOW_URL || ''

const buildQuery = mode => {
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
