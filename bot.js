import Telegraf from 'telegraf'

const app = new Telegraf(process.env.TOKEN)
const modes = require('./modes')

const url = process.env.URL || process.env.NOW_URL || ''

// Inline Mode
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
app.command('start', ctx => {
  let message = 'I can help you make decisions with the following commands:\n\n'

  modes.forEach(mode => {
    const {title, command, parameter} = mode()
    message += `*${title}* – /${command} _${parameter || ''}_\n`
  })

  ctx.reply(message, {
    parse_mode: 'Markdown'
  })
})

modes.forEach(mode => {
  const m = mode()
  app.command(m.command, ctx => {
    const {text} = ctx.update.message
    const index = text.trim().indexOf(' ')
    const query = index > 0 ? text.substr(index + 1) : ''

    const {message, parameterRequired, command, parameter} = mode(query)

    let parameterMessage
    if (parameterRequired && !query) {
      parameterMessage = `A parameter is required to use this command.\n\nExample: /${command} _${parameter}_`
    }

    ctx.reply(parameterMessage || message, {
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
