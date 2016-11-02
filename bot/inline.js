import modes from '../modes'

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

export default app => {
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
}
