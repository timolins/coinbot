import { mount } from 'telegraf'
import commands from '../commands'

const url = process.env.URL || process.env.NOW_URL

const buildAnswer = command => {
  const {title, message, description, thumb} = command

  const answer = {
    id: title,
    title,
    description,
    type: 'article',
    input_message_content: {
      message_text: message,
      parse_mode: 'Markdown'
    }
  }

  if (url && thumb) {
    answer.thumb_url = `${url}/static/thumbs/${thumb}`
  }

  return answer
}

export default mount('inline_query', ctx => {
  const {query} = ctx.inlineQuery

  const results = commands
  .map(command => command(query))
  .filter(command => command && command.enabled)
  .map(command => buildAnswer(command))

  ctx.answerInlineQuery(results, {
    is_personal: true,
    cache_time: 0
  })
})
